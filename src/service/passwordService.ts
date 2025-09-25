import {Response,Request} from "express";
import User from "../models/userModel";
import { randomBytes } from "crypto";
import { SendMail } from "../utils/sendEmail";
import Password from "../models/passwordModel";

export async function forgotPassword(req: Request, res: Response){
    const {email} = req.body;
    if(!email){
        return res.status(404).json({message:"Email cant be blank"})
    }
    
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"No user with this email"})
    }

    const randomPassword = randomBytes(8).toString('hex')
    console.log("hello")
    await Password.findOneAndUpdate({
    userId: user._id},
    {passwordReset: randomPassword,
    passwordExpiry: new Date(Date.now() + 60 * 60 * 1000)},{ upsert: true, new: true }
    );
    console.log("hello")
    await SendMail(email, randomPassword)
    
    return res.status(200).json({message:"New Password sent successfully"})
}

export async function resetPassword(req: Request,res: Response){
    const{email} = req.body;
    const{randomPassword} = req.body;
    const{newPassword} = req.body;

    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"No user with this email"})
    }
    const findPassword = await Password.findOne({ userId: user._id });
        if (!findPassword) {
        return res.status(404).json({ message: "No PasswordReset for this user" });
      }

    if (findPassword.passwordReset != randomPassword || !findPassword.passwordExpiry || new Date() > findPassword.passwordExpiry){
        return res.status(404).json({message:"Invalid or expired Password"})
    }

    user.password = newPassword;
    await user.save()

    findPassword.passwordReset = null;
    findPassword.passwordExpiry = null;

    await findPassword.save()
    return res.status(200).json({message:"Password Changed Successfully"})
}
