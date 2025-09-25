import { Request, Response } from "express";
import { validatePassword } from "../gLogic/gvalidatePassword";
import {cookieInfo} from "../utils/cookiesInfo"; 
import Sessh from "../gLogic/gSessionModel";
import { createSession } from "../gLogic/gSessionService";
import Rider from "./riderModel";

export async function RiderLogin(req: Request, res: Response){
  try{
    const { email, password } = req.body;

    const rider = await validatePassword(Rider, {email, password});
    if (!rider) {
        return res.status(401).send("Invalid email or password");
    }

    await Sessh.deleteMany({ userId: rider._id, role: "rider"});

    const sessionId = await createSession(rider, "rider");
    res.cookie("sessionId", sessionId, cookieInfo);

    res.status(200).json({ message: "Login successful" ,sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }   
}