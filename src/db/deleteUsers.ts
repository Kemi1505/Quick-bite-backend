import { Request, Response } from "express";
import User from "../models/userModel";

export async function deleteOneUser(req: Request, res: Response) {
  try {
    const { name } = req.params; 

    const user = await User.findOneAndDelete({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: `User ${name} deleted ` });
  } catch (error) {
    return res.status(500).json({  error });
  }
}

export async function deleteAllUsers(req: Request, res: Response) {
  try {
    const result = await User.deleteMany({});
    return res.status(200).json({ message: `${result.deletedCount} all Users deleted` });
  } catch (error) {
    return res.status(500).json({error });
  }
}
