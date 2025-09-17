import { Request, Response } from "express";
import { createUser } from "../service/userService";

export async function createUserHandler(req: Request, res: Response) {
try{
    const user = await createUser(req.body);
    const { password, ...userWithoutPassword } = user.toJSON();
    res.send(userWithoutPassword);
}catch(e:any){
    console.log(e)
    return res.status(409).send(e.message);
}
}