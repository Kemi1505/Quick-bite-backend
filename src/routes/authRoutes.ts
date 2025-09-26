import { Express } from "express";
import validate from "../utils/validateSchema"
import { createRiderSchema, createUserSchema, createVendorSchema } from "../utils/validateAccount"
import { userSignup } from "../controllers/userSignupController";
import { vendorSignup} from "../controllers/vendorSignUpController"
import {riderSignup} from "../controllers/riderSignUpController"
import {userLogin, userLogout} from "../controllers/userSigninController"
import {vendorLogin, vendorLogout} from "../controllers/vendorSigninController"
import {riderLogin, riderLogout} from "../controllers/riderSigninController"

export default (app: Express) => {
    // SignUp
    app.post("/users/signup", validate(createUserSchema), userSignup);
    app.post("/vendors/signup", validate(createVendorSchema), vendorSignup);
    app.post("/riders/signup", validate(createRiderSchema), riderSignup);

    //Login
    app.post("/users/login", userLogin);
    app.post("/vendors/login", vendorLogin);
    app.post("/riders/login", riderLogin);

    //LogOut
    app.post("/users/logout", userLogout);
    app.post("/vendors/logout", vendorLogout);
    app.post("/riders/logout", riderLogout);
}