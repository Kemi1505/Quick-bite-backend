import mongoose, {Schema} from "mongoose";
import { comparePassword, hashPassword } from "../utils/hashPassword";

export interface RiderDocument extends mongoose.Document{
    email: string;
    name: string;
    phoneNumber:string;
    password: string;
    vehicleType: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const riderSchema = new Schema<RiderDocument>({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    },

    {timestamps: true},
    
)

riderSchema.pre("save", hashPassword)

riderSchema.methods.comparePassword = comparePassword

const Rider = mongoose.model<RiderDocument>("Rider", riderSchema)

export default Rider;