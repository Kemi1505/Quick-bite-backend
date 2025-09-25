import { Request, Response } from "express";
import { createVendor } from "./vendorService";

export async function createVendorHandler(req: Request, res: Response) {
try{
    const user = await createVendor(req.body);
    const { password, ...userWithoutPassword } = user.toJSON();
    res.send(userWithoutPassword);
}catch(e:any){
    console.log(e)
    return res.status(409).send(e.message);
}
}