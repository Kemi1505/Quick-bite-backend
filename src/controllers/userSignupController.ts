import { Request, Response } from "express";
import { createUser } from "../services/userService";
import { SendOnboardingMail } from "../utils/sendEmail";
import { generateOtp } from "../services/otpService";

export async function userSignup(req: Request, res: Response) {
try{
    const {email, phoneNumber, name} = req.body
    const user = await createUser(req.body); 
    await generateOtp(phoneNumber, "user")
    SendOnboardingMail(email,name)
    const { password, ...userWithoutPassword } = user.toJSON();
    res.send(userWithoutPassword);
}catch(e:any){
    console.log(e)
    return res.status(409).send(e.message);
}
}