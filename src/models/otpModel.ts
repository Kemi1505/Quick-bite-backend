import mongoose, {Schema} from "mongoose";

export interface OtpDocument extends mongoose.Document{  
    userId: mongoose.Types.ObjectId;
    role: "user" | "vendor" | "rider";
    otp: string | null;
    otpExpiry: Date | null;
    isVerified: boolean;
}

const otpSchema = new Schema<OtpDocument>({
    userId: { type: Schema.Types.ObjectId, refPath: "role", required: true },
    role: { type: String, enum: ["user", "vendor", "rider"], required: true },
    otp: {type: String, required: false},
    otpExpiry: {type: Date, required: false},
    isVerified: {type: Boolean, default: false}
    }
)

const Otp = mongoose.model<OtpDocument>("Otp", otpSchema)

export default Otp;