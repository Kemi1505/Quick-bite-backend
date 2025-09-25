import mongoose, {Schema} from "mongoose";

export interface OtpDocument extends mongoose.Document{  
    userId: mongoose.Types.ObjectId;
    otp: string | null;
    otpExpiry: Date | null;
    isVerified: boolean;
}

const otpSchema = new Schema<OtpDocument>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    otp: {type: String, required: false},
    otpExpiry: {type: Date, required: false},
    isVerified: {type: Boolean, default: false}
    }
)

const Otp = mongoose.model<OtpDocument>("Otp", otpSchema)

export default Otp;



