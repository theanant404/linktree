import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod";
import { emailValidation } from "@/schcemas/singUpSchema";

const EmailQuerySchema = z.object({
    email: emailValidation,
});

export async function GET(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
        const queryParams = {
            email: searchParams.get("email"),
        };
    try {
        
        const result = EmailQuerySchema.safeParse(queryParams);
        if (!result.success) {
            const emailErrors = result.error.errors.map((error) => error.message);
            return Response.json({ success: false, message: emailErrors?.length > 0 ? emailErrors.join(', ') : "Invalid email" }, { status: 200 });
        }
        const { email } = queryParams;
        const existingVerifiedUser = await UserModel.findOne({ email, isVarified: true });
        if (existingVerifiedUser) {
            return Response.json({ success: false, message: "Email Exist" }, { status: 200 });
        }
        return Response.json({ success: true, message: "Email not register go to Register" });
    } catch (error) {
        console.error('Error checking email:', error);
        return Response.json(
            {
                success: false,
                message: 'Error checking email',
            },
            { status: 500 }
        );
    }
}