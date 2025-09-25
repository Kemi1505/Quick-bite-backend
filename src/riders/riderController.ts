import { Request, Response } from "express";
import { createRider } from "./riderService";

export async function createRiderHandler(req: Request, res: Response) {
try{
    const user = await createRider(req.body);
    const { password, ...userWithoutPassword } = user.toJSON();
    res.send(userWithoutPassword);
}catch(e:any){
    console.log(e)
    return res.status(409).send(e.message);
}
}