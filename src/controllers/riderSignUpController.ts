import { Request, Response } from "express";
import { createRider } from "../services/riderService";
import { SendOnboardingMail } from "../utils/sendEmail";
import { generateOtp } from "../services/otpService";

export async function riderSignup(req: Request, res: Response) {
try{
    const {email, phoneNumber,name} = req.body
    const rider = await createRider(req.body);
    await generateOtp(phoneNumber, "rider")
    //SendOnboardingMail(email,name) 
    const { password, ...riderWithoutPassword } = rider.toJSON();
    res.send(riderWithoutPassword);
}catch(e:any){
    console.log(e)
    return res.status(409).send(e.message);
}
}