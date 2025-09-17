import { Request, Response } from "express";
import User from "../models/userModel";

export async function AllUsers(req: Request, res: Response) {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
