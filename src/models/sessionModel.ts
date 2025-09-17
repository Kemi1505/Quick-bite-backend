import mongoose from "mongoose";

export interface SessionDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  valid: boolean;
  sessionId: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    valid: {type: Boolean, default: true},
    sessionId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Session = mongoose.model<SessionDocument>("Session", sessionSchema);

export default Session;
