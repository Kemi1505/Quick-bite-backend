import { Request, Response } from "express";
import { validatePassword } from "../utils/validatePassword";
import { createSession } from "../service/sessionService";
import {cookieInfo} from "../utils/cookiesInfo"; 
import Session from "../models/sessionModel";

export async function sessionHandler(req: Request, res: Response){
  try{
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    await Session.deleteMany({ user: user._id });

    const sessionId = await createSession(user._id.toString());
    res.cookie("sessionId", sessionId, cookieInfo);

    res.status(200).json({ message: "Login successful" ,sessionId, cookie: req.cookies,user});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }   
}





