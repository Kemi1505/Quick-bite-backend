import { Request, Response } from "express";
import Session from "../models/sessionModel";

export async function deleteSession(req: Request, res: Response) {
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

