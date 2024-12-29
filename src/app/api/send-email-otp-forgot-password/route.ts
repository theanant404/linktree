import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod";
import { emailValidation } from "@/schcemas/singUpSchema";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

const EmailQuerySchema = z.object({
  email: emailValidation,
});

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      email: searchParams.get("email"),
    };
    const result = EmailQuerySchema.safeParse(queryParams);
    if (!result.success) {
      const emailErrors = result.error.errors.map((error) => error.message);
      return Response.json(
        {
          success: false,
          message:
            emailErrors?.length > 0 ? emailErrors.join(", ") : "Invalid email",
        },
        { status: 400 }
      );
    }
    const { email } = queryParams;
    const existingVerifiedUser = await UserModel.findOne({
      email,
      isVarified: true,
    });
    // console.log(existingVerifiedUser);
    if (!existingVerifiedUser) {
      return Response.json(
        { success: false, message: "Email is not register" },
        { status: 200 }
      );
    }
    // update verify code and expiry
    let veryfyCode = Math.floor(100000 + Math.random() * 900000).toString();
    existingVerifiedUser.verifyCode = veryfyCode;
    existingVerifiedUser.verifyCodeExpiry = new Date(Date.now() + 3600000);
    await existingVerifiedUser.save();

    // send email otp
    const emailResponse = await sendVerificationEmail(
      existingVerifiedUser.name,
      existingVerifiedUser.email,
      existingVerifiedUser.username,
      veryfyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: "Failed to send verification email" },
        { status: 500 }
      );
    }
    return Response.json({ success: true, message: "Otp send successfully" });
  } catch (error) {}
}
