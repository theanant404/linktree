import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { name, username, email, password } = await request.json();
    const existingVerifiedUser = await UserModel.findOne({
      email,
    });
    if (existingVerifiedUser && existingVerifiedUser.isVarified) {
      return Response.json({ success:false,message: "User already exists" }, { status: 400 });
    }
    if(existingVerifiedUser && !existingVerifiedUser.isVarified){
      // delet that user
      await UserModel.findByIdAndDelete(existingVerifiedUser._id);
    }
  
    const existingUserByEmail = await UserModel.findOne({ email });
    let veryfyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVarified) {
        return Response.json({ success:false,message: "User already exists" }, { status: 400 });
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = veryfyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 12);
      const expiryDate = new Date(Date.now())
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser=new UserModel({
          name,
          username,
          email,
          password:hashedPassword,
          verifyCode:veryfyCode,
          verifyCodeExpiry:expiryDate,
          image:"",
          imagePublicId:"",
      })
      await newUser.save();
    }
  
    // Send Email Verification
    const emailResponse = await sendVerificationEmail(name, email, username, veryfyCode);
    if(!emailResponse.success){
      return Response.json({ success:false,message: "Failed to send verification email" }, { status: 500 });
    }
      return Response.json({success:true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json({ success:false,message: "Failed to register user" }, { status: 500 });
    
  }
}
