import mongoose, {Schema} from "mongoose";
import { comparePassword, hashPassword } from "../utils/hashPassword";

export interface UserDocument extends mongoose.Document{
    email: string;
    name: string;
    phoneNumber:string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    },

    {timestamps: true},
    
)

userSchema.pre("save", hashPassword)

userSchema.methods.comparePassword = comparePassword

const User = mongoose.model<UserDocument>("User", userSchema)

export default User;