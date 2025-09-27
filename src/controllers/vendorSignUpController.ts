import { Request, Response } from "express";
import {createVendor} from "../services/vendorService"
import { SendOnboardingMail } from "../utils/sendEmail";
import { generateOtp } from "../services/otpService";

export async function vendorSignup(req: Request, res: Response) {
try{
    const {email, phoneNumber ,name} = req.body
    const vendor = await createVendor(req.body);
    await generateOtp(phoneNumber, "vendor")
    //SendOnboardingMail(email,name)
    const { password, ...vendorWithoutPassword } = vendor.toJSON();
    res.send(vendorWithoutPassword);
}catch(e:any){
    console.log(e)
    return res.status(409).send(e.message);
}
}