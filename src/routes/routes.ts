import { Express, Request, Response } from "express";
import validate from "../middleware/validateSchema";
import { createUserSchema } from "../utils/validateUser";
import { createUserHandler } from "../controller/userController";
import { sessionHandler } from "../controller/loginController";
import { createSessionSchema } from "../utils/validateSession";
import { activeSession } from "../controller/sessionController";
import { deleteSession } from "../controller/logoutController";
import { AllUsers } from "../db/getUsers";
import { forgotPassword, resetPassword } from "../service/passwordService";
import { deleteAllUsers } from "../db/deleteUsers";
import { generateOtp,verifyOtp,resendOtp } from "../service/otpService";
import { createVendorHandler } from "../vendors/vendorCollection";
import { vendorLogin } from "../vendors/vendorLogin";
import { vendorLogout } from "../vendors/vendorLogout";
import { createRiderSchema, createVendorSchema } from "../gLogic/gValidateSchema";
import { createRiderHandler } from "../riders/riderController";
import { RiderLogin } from "../riders/riderLogin";
import { RiderLogout } from "../riders/riderLogout";
import { verifyVendorOtp } from "../gLogic/gotpService";

export default (app: Express) => {
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

    //Forget Password
    app.post("/api/forget-password", forgotPassword)

    //Reset Passord
    app.post("/api/reset-password", resetPassword)

    app.post("/api/delete",deleteAllUsers)

    //Generate Otp
    app.post("/api/generate-otp", generateOtp)

    app.post("/api/verify-otp", verifyOtp)

    app.post("/api/resend-otp", resendOtp)

    app.post("/vendor/signup",validate(createVendorSchema), createVendorHandler)

    app.post("/vendor/login", vendorLogin)

    app.post("/vendor/logout", vendorLogout)

    app.post("/vendor/verify-otp", verifyVendorOtp)

    app.post("/vendor/gen-otp", generateOtp)

    app.post("/vendor/resend-otp", resendOtp)

    app.post("/rider/signup",validate(createRiderSchema), createRiderHandler)

    app.post("/rider/login", RiderLogin)

    app.post("/rider/logout", RiderLogout)

}