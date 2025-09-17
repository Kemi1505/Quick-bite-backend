import { Request, Response, NextFunction } from "express";
import Session from "../models/sessionModel";
import User, { UserDocument } from "../models/userModel";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { sessionId } = req.cookies;

    if (!sessionId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const session = await Session.findOne({ sessionId, expiresAt: { $gt: new Date() } });
    if (!session) {
      return res.status(401).json({ message: "Session expired or invalid" });
    }

    const user = await User.findById(session.user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    (req as Request & { user: UserDocument }).user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error});
  }
}
