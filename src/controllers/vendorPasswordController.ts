import {Response,Request} from "express";
import {forgotPassword} from "../services/passwordService"
import { resetPassword } from "../services/passwordService";

export async function forgotVendorPassword(req: Request, res: Response){
    try{
        const {email} = req.body;
        await forgotPassword(email, "vendor")
        return res.status(200).json({message: "New Password sent successfully"})
    }catch(error: any){
        res.status(404).json({message:error.message})
    }
}

export async function resetVendorPassword(req: Request, res: Response){
    try{
        const {email, randomPassword, newPassword} = req.body;
        await resetPassword(email,randomPassword,newPassword,"vendor");
        res.status(200).json({message: "Password changed successfully"})
    } catch (err: any) {
        res.status(400).json({message: err.message})
    }
}