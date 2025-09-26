import {Response,Request} from "express";
import User from "../models/userModel";
import Vendor from "../models/vendorModel";
import Rider from "../models/riderModel";
import { randomBytes } from "crypto";
import { SendPasswordMail } from "../utils/sendEmail";
import Password from "../models/passwordModel"

const models: Record<string, any> = { 
  user: User,
  vendor: Vendor,
  rider: Rider
}; 

export async function forgotPassword(email: string, role: "user"|"vendor"|"rider"){
    if(!email){
        throw new Error("Email cant be blank")
    }
    
    const Model = models[role];
    const account = await Model.findOne({email})
    if(!account){
        throw new Error(`${role} not found`)
    }

    const randomPassword = randomBytes(8).toString('hex')
    await Password.findOneAndUpdate({
    userId: account._id, role},
    {passwordReset: randomPassword,
    passwordExpiry: new Date(Date.now() + 60 * 60 * 1000)},{ upsert: true, new: true }
    );
    SendPasswordMail(email, randomPassword)   
}

export async function resetPassword(email:string,randomPassword:string,newPassword:string, role: "user"|"vendor"|"rider"){
    const Model = models[role];
    const account = await Model.findOne({email})
    if(!account){
        throw new Error(`${role} not found`)
    }

    const findPassword = await Password.findOne({ userId: account._id, role });
    if (!findPassword) {
    throw new Error(`No PasswordReset for this ${role}` );
    }

    if(newPassword.length < 6){
        throw new Error("Password should be at least 6 characters")
    }

    if (findPassword.passwordReset != randomPassword || !findPassword.passwordExpiry || new Date() > findPassword.passwordExpiry){
        throw new Error("Invalid or expired Password")
    }

    account.password = newPassword;
    await account.save()

    findPassword.passwordReset = null;
    findPassword.passwordExpiry = null;

    await findPassword.save()
}