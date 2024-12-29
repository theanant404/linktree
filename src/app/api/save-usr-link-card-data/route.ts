import dbConnect from "@/lib/dbConnect";
import LinkCardModel from "@/model/LinkCard.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function POST(request:Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { name, username, bio,avatar,avatarId, socialLinks, otherLinks, theme, primaryColor } = await request.json();

    await dbConnect();
    try {
        const newLinkCard = new LinkCardModel({
            user:session.user._id,
            name,
            username,
            bio,
            avatar,
            avatarId,
            socialLinks,
            otherLinks,
            theme,
            primaryColor,
        });
        await newLinkCard.save();
        return Response.json({ success: true, message: "Link card saved successfully" },{status:202});
    } catch (error) {
        console.error("Error saving link card:", error);
        return Response.json({ success: false, message: "Failed to save link card" }, { status: 500 });
    }
}