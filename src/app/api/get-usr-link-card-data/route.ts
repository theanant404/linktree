import UserModel from "@/model/User.model";
import LinkCardModel from "@/model/LinkCard.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

export async function GET(request:Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    try {
        await dbConnect()
        const responce=await LinkCardModel.findOne({user:session.user._id})
        console.log(responce)
    } catch (error) {
        console.error("Error saving link card:", error);
        return Response.json({ success: false, message: "Failed to save link card" }, { status: 500 });
    }
    
}