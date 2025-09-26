import { Request, Response } from "express";
import User from "../models/userModel";
import Vendor from "../models/vendorModel";
import Rider from "../models/riderModel";
import Otp from "../models/otpModel"
import { SendOtp } from "../utils/sendSms";

const models: Record<string, any> = {
  user: User,
  vendor: Vendor,
  rider: Rider
};

export async function generateOtp(phoneNumber: string, role: "user" | "vendor" | "rider"){
    const Model = models[role];
    const account = await Model.findOne({phoneNumber})
    if(!account){
        throw new Error(`${role} not found`)
    }

    const otp = Math.floor(100000+ Math.random()*900000).toString()
       
    await Otp.findOneAndUpdate({
    userId: account._id, role},
    {otp: otp,
    otpExpiry: new Date(Date.now() + 5 * 60 * 1000)},
    { upsert: true, new: true }
    );

    SendOtp(phoneNumber, otp)
}

export async function verifyOtp(phoneNumber: string, otp: string, role: "user" | "vendor" | "rider"){
    const Model = models[role];
    const account = await Model.findOne({phoneNumber});
    if (!account){
        throw new Error(`${role} not found`)
    }

    const findOtp = await Otp.findOne({ userId: account._id, role });
    if (!findOtp) {
    throw new Error("No Otp for this user")
  }

    if(findOtp.otp!= otp || !findOtp.otpExpiry || new Date() > findOtp.otpExpiry){
        throw new Error("Invalid or Expired Otp")
    }

    findOtp.isVerified = true;
    findOtp.otp = null;
    findOtp.otpExpiry = null;

    await findOtp.save()
}