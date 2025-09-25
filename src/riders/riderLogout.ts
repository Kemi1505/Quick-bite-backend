import { Request, Response } from "express";
import Sessh from "../gLogic/gSessionModel";

export async function RiderLogout(req: Request, res: Response) {
  try {
    const { sessionId } = req.cookies;
    if (sessionId) {
      await Sessh.deleteOne({ sessionId });
      res.clearCookie("sessionId");
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}