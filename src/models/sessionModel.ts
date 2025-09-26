import mongoose from "mongoose";

export interface SessionDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  role: "user" | "vendor" | "rider";
  valid: boolean;
  sessionId: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, refPath: "role", required: true },
    valid: {type: Boolean, default: true},
    role: { type: String, enum: ["user", "vendor", "rider"], required: true },
    sessionId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", sessionSchema);

export default Session;