import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { z } from "zod";
import { usernameValidation } from "@/schcemas/singUpSchema";


const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
    const queryParams = {
      username: searchParams.get("username"),
    };
  try {
    
    const result=UsernameQuerySchema.safeParse(queryParams);
    if(!result.success){
        const usernameErrors = result.error.errors.map((error) => error.message);
      return Response.json({ success:false,message:usernameErrors?.length>0?usernameErrors.join(', '): "Invalid username" }, { status: 400 });
    }
    const { username } = queryParams;
    const existingVerifiedUser=await UserModel.findOne({username,isVarified:true});
    if(existingVerifiedUser){
        return Response.json({ success:false,message: "Username already taken" }, { status: 200 });
    }
    return Response.json({ success:true,message: "Username available" });
  } catch (error) {
    console.error('Error checking username:', error);
    return Response.json(
      {
        success: false,
        message: 'Error checking username',
      },
      { status: 500 }
    );
  }
}
