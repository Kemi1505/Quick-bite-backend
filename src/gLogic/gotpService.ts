import User from "../models/userModel";
import Vendor from "../vendors/vendorsModel";
import Rider from "../riders/riderModel";
import Otpi from "./gOtpModel";
import { SendOtp } from "../utils/sendSms";
import { Request, Response } from "express";

const models: Record<string, any> = {
  user: User,
  vendor: Vendor,
  rider: Rider
};

export async function globalGenerateOtp(phoneNumber: string, role: "user" | "vendor" | "rider"){
    const Model = models[role];
    const account = await Model.findOne({phoneNumber})
    if(!account){
        throw new Error(`${role} not found`)
    }

    const otp = Math.floor(100000+ Math.random()*900000).toString()
    
    
    await Otpi.findOneAndUpdate({
    userId: account._id, role},
    {otp: otp,
    otpExpiry: new Date(Date.now() + 5 * 60 * 1000)},
    { upsert: true, new: true }
    );

    console.log("Saved OTP:", { userId: account._id, role, otp });

    SendOtp(phoneNumber, otp)
}

export async function generateOtp(req: Request, res: Response){
    try{
    const {phoneNumber} = req.body;
    
    await globalGenerateOtp(phoneNumber, "vendor")
    return res.status(200).json({message: "Otp Sent successfully"})
    }catch(error: any){
        res.status(404).json({message:error.message})
    }

}

export async function verifyOtp(phoneNumber: string, otp: string, role: "user" | "vendor" | "rider"){
    const Model = models[role];
    const account = await Model.findOne({phoneNumber});
    if (!account){
        throw new Error(`${role} not found`)
    }

    const findOtpi = await Otpi.findOne({ userId: account._id, role });
    if (!findOtpi) {
    throw new Error("No Otp for this user")
  }

    console.log("Looking for OTP:", { userId: account._id, role });
    console.log("Found:", findOtpi);

    if(findOtpi.otp!= otp || !findOtpi.otpExpiry || new Date() > findOtpi.otpExpiry){
        throw new Error("Invalid or Expired Otp")
    }

    findOtpi.isVerified = true;
    findOtpi.otp = null;
    findOtpi.otpExpiry = null;

    await findOtpi.save()
}

export async function verifyVendorOtp(req: Request, res: Response) {
  try {
    const { phoneNumber, otp } = req.body;
    await verifyOtp(phoneNumber, otp, "vendor");
    res.status(200).json({ message: "Number verified successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function resendOtp(req: Request, res: Response){
    const {phoneNumber} = req.body;
    
    await globalGenerateOtp(phoneNumber, "vendor");

    return res.status(200).json({message: "Otp sent successfully"})
}