import User from "../models/userModel";
import Otp from "../models/otpModel";
import { SendOtp } from "../utils/sendSms";
import { Request, Response } from "express";

export async function globalGenerateOtp(phoneNumber: string){
    const user = await User.findOne({phoneNumber})

    if(!user){
        throw new Error("User not found")
    }

    const otp = Math.floor(100000+ Math.random()*900000).toString()
    

    await Otp.findOneAndUpdate({
    userId: user._id},
    {otp: otp,
    otpExpiry: new Date(Date.now() + 5 * 60 * 1000)},{ upsert: true, new: true }
    );

    SendOtp(phoneNumber, otp)
}

export async function generateOtp(req: Request, res: Response){
    try{
    const {phoneNumber} = req.body;
    await globalGenerateOtp(phoneNumber)
    return res.status(200).json({message: "Otp Sent successfully"})
    }catch(error: any){
        res.status(404).json({message:error.message})
    }

}

export async function verifyOtp(req: Request, res: Response){
    const {phoneNumber} = req.body;
    const{otp} = req.body

    const user = await User.findOne({phoneNumber});
    if (!user){
        return res.status(200).json({message: "User not found"})
    }

    const findOtp = await Otp.findOne({ userId: user._id });
    if (!findOtp) {
    return res.status(404).json({ message: "No Otp for this user" });
  }
    if(findOtp.otp!= otp || !findOtp.otpExpiry || new Date() > findOtp.otpExpiry){
        return res.status(200).json({message: "Invalid or expired otp"})
    }

    findOtp.isVerified = true;
    findOtp.otp = null;
    findOtp.otpExpiry = null;

    await findOtp.save()
    return res.status(200).json({message: "Number verified successfully"})
}

export async function resendOtp(req: Request, res: Response){
    const {phoneNumber} = req.body;
    await globalGenerateOtp(phoneNumber);

    return res.status(200).json({message: "Otp sent successfully"})
}