import mongoose, {Schema} from "mongoose";

export interface PasswordDocument extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    role: "user" | "vendor" | "rider";
    passwordReset: string | null;
    passwordExpiry: Date | null;
}

const passwordSchema = new Schema<PasswordDocument>({   
    userId: { type: Schema.Types.ObjectId, refPath: "role", required: true },
    role: { type: String, enum: ["user", "vendor", "rider"], required: true },
    passwordReset: {type: String, required: false},
    passwordExpiry: {type: Date, required: false}, 
    }
    
)

const Password = mongoose.model<PasswordDocument>("Password", passwordSchema)

export default Password;