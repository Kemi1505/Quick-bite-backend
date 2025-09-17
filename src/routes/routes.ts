import { Express, Request, Response } from "express";
import validate from "../middleware/validateSchema";
import { createUserSchema } from "../utils/validateUser";
import { createUserHandler } from "../controller/userController";
import { sessionHandler } from "../controller/loginController";
import { createSessionSchema } from "../utils/validateSession";
import { activeSession } from "../controller/sessionController";
import { deleteSession } from "../controller/logoutController";
import { AllUsers } from "../db/getUsers";

export default (app: Express) =>{
    app.get("/check", (req: Request, res: Response) => res.sendStatus(200))

    // SignUp
    app.post("/api/signup",validate(createUserSchema), createUserHandler);

    //Login
    app.post("/api/login", validate(createSessionSchema), sessionHandler);

    //LogOut
    app.post("/api/logout", deleteSession );

    // Check loggenin users
    app.get("/api/users", activeSession)

    // All registered Users
    app.get("/api/allusers", AllUsers)

}