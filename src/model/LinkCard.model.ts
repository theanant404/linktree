/** @format */

import mongoose, { Schema, Document } from "mongoose";
export interface SocialLink {
  platform: string;
  url: string;
}
export interface OtherLink {
  title: string;
  url: string;
  icon: string;
}
export interface LinkCard extends Document {
  user:object;
  name: string;
  username: string;
  avatar: string;
    avatarId: string;
  bio: string;
  socialLinks: SocialLink[];
  otherLinks: OtherLink[];
  theme: "light" | "dark";
  primaryColor: string;
}


const LinkCardSchema: Schema<LinkCard> = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    avatarId: { type: String, required: true },
    bio: { type: String, required: true },
    socialLinks: [
        {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        },
    ],
    otherLinks: [
        {
        title: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, required: true },
        },
    ],
    theme: { type: String, required: true },
    primaryColor: { type: String, required: true },
    
}, { timestamps: true });

const LinkCardModel = mongoose.models.LinkCard as mongoose.Model<LinkCard> || mongoose.model<LinkCard>("LinkCard", LinkCardSchema);
export default LinkCardModel;