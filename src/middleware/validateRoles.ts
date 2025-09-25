// import { Request, Response, NextFunction } from "express";
// import { UserDocument } from "../models/userModel";

// export function ValidateRole(role: string) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user = (req as Request & { user: UserDocument }).user;
//     if (!user) {
//       return res.status(401).json({ message: "Log In first" });
//     }

//     if (role !== user.role) {
//       return res.status(403).json({ message: "Cannot access this" });
//     }

//     next();
//   };
// }
