import crypto from "crypto";
import Session from "../models/sessionModel"; 

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();

  const session = await Session.create({
    user: userId,
    sessionId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
  });

  return session.sessionId;
}

