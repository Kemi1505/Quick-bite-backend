import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import config from 'config';

export interface UserDocument extends mongoose.Document{
    email: string;
    name: string;
    password: string;
    role: "user" | "vendor" | "rider";
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    role: { type: String, enum: ["user", "vendor", "rider"],required: true}
    },
    {timestamps: true}
)

userSchema.pre("save", async function(){
    const user = this;
    if (!user.isModified('password'))
        return;
    try {
        const salt = await bcrypt.genSalt(config.get("saltWorkFactor"))
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;   
    } catch (error) {
        return (error)
    }
})

userSchema.methods.comparePassword = async function(
    candidatePassword: string
): Promise<boolean>{ 
    const user = this;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const User = mongoose.model<UserDocument>("User", userSchema)

export default User;



