import crypto from "crypto";
import Session from "../models/sessionModel";

export async function createSession(user: any, role: "user" | "vendor" | "rider") {
  const sessionId = crypto.randomUUID();

  const session = await Session.create({
    userId: user._id,
    sessionId,
    role,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
  });

  return session.sessionId;
}