import { Request, Response } from "express";
import Session from "../models/sessionModel";

export async function activeSession(req: Request, res: Response) {
  try {
    const activeSessions = await Session.find({ expiresAt: { $gt: new Date() } })
      .populate("user", "name email");

    res.status(200).json({ activeSessions });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
