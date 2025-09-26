import { Express } from "express";
import {forgotUserPassword, resetUserPassword} from "../controllers/userPasswordController"
import {forgotVendorPassword, resetVendorPassword} from "../controllers/vendorPasswordController"
import {forgotRiderPassword, resetRiderPassword} from "../controllers/riderPasswordController"

export default (app: Express) =>{
    //Forget Password
    app.post("/users/forget-password", forgotUserPassword)
    app.post("/vendors/forget-password", forgotVendorPassword)
    app.post("/riders/forget-password", forgotRiderPassword)

    //Reset Passord
    app.post("/users/reset-password", resetUserPassword)
    app.post("/vendors/reset-password", resetVendorPassword)
    app.post("/riders/reset-password", resetRiderPassword)
}