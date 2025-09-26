import { Request, Response } from "express";
import {validatePassword} from "../utils/validatePassword"
import {cookieInfo} from "../utils/cookieInfo"; 
import Session from "../models/sessionModel"
import {createSession} from "../services/sessionService"
import User from "../models/userModel";
import Otp from "../models/otpModel"
import {generateOtp} from "../services/otpService"

export async function userLogin(req: Request, res: Response){
  try{
    const { email, password } = req.body;

    const user = await validatePassword(User, {email, password});
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    const phone = user.phoneNumber;
    
    const findOtp = await Otp.findOne({ userId: user._id, role: "user" });
    if (!findOtp||!findOtp.isVerified) {
      await generateOtp(phone, "user")
      res.status(404).json("You have to verify first, recheck sms for otp")
    }

    await Session.deleteMany({ userId: user._id, role: "user"});

    const sessionId = await createSession(user, "user");
    res.cookie("sessionId", sessionId, cookieInfo);

    res.status(200).json({ message: "Login successful" ,sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }   
}

export async function userLogout(req: Request, res: Response) {
  try {
    const { sessionId } = req.cookies;
    if (sessionId) {
      await Session.deleteOne({ sessionId });
      res.clearCookie("sessionId");
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}