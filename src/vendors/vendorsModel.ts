import mongoose, {Schema} from "mongoose";
import { comparePassword, hashPassword } from "../utils/hashPassword";

export interface VendorDocument extends mongoose.Document{
    email: string;
    name: string;
    phoneNumber:string;
    password: string;
    businessType: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const vendorSchema = new Schema<VendorDocument>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    },

    {timestamps: true},
    
)

vendorSchema.pre("save", hashPassword)

vendorSchema.methods.comparePassword = comparePassword

const Vendor = mongoose.model<VendorDocument>("Vendor", vendorSchema)

export default Vendor;