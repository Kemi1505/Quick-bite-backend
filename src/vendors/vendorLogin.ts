import { Request, Response } from "express";
import { validatePassword } from "../gLogic/gvalidatePassword";
import {cookieInfo} from "../utils/cookiesInfo"; 
import Sessh from "../gLogic/gSessionModel";
import { createSession } from "../gLogic/gSessionService";
import Vendor from "./vendorsModel";

export async function vendorLogin(req: Request, res: Response){
  try{
    const { email, password } = req.body;

    const vendor = await validatePassword(Vendor, {email, password});
    if (!vendor) {
        return res.status(401).send("Invalid email or password");
    }

    await Sessh.deleteMany({ userId: vendor._id, role: "vendor"});

    const sessionId = await createSession(vendor, "vendor");
    res.cookie("sessionId", sessionId, cookieInfo);

    res.status(200).json({ message: "Login successful" ,sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }   
}