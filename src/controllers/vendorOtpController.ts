import { Request, Response } from "express";
import {generateOtp} from "../services/otpService"
import { verifyOtp } from "../services/otpService";

export async function verifyVendorOtp(req: Request, res: Response) {
  try {
    const { phoneNumber, otp } = req.body;
    await verifyOtp(phoneNumber, otp, "vendor");
    res.status(200).json({ message: "Number verified successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function resendVendorOtp(req: Request, res: Response){
    const {phoneNumber} = req.body;   
    await generateOtp(phoneNumber, "vendor");
    return res.status(200).json({message: "Otp sent successfully"})
}