import mongoose,{Schema,Document} from "mongoose";

export interface User extends Document {
    name: string;
    username: string;
    image: string;
    imagePublicId: string;
    email: string;
    password: string;
    verifyCode:string;
    isVarified: boolean;
    verifyCodeExpiry: Date;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true,unique: true, index: true,match: /.+@.+\..+/},
    password: {type: String, required: true},
    isVarified: {type: Boolean, default: false,required: true},
    verifyCodeExpiry: {type: Date, required: true},
    verifyCode: {type: String, required: true},
    image: {type: String},
    imagePublicId: {type: String}
});

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);
export default UserModel;