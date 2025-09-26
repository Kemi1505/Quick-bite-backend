import { Express } from "express";
import { resendUserOtp, verifyUserOtp} from "../controllers/userOtpController"
import {resendVendorOtp, verifyVendorOtp} from "../controllers/vendorOtpController"
import {resendRiderOtp, verifyRiderOtp} from "../controllers/riderOtpController"

export default (app: Express) =>{
    //Verify Otp
    app.post("/users/verify-otp", verifyUserOtp)
    app.post("/vendors/verify-otp", verifyVendorOtp)
    app.post("/riders/verify-otp", verifyRiderOtp)

    //Resend Otp
    app.post("/users/resend-otp", resendUserOtp)
    app.post("/vendors/resend-otp", resendVendorOtp)
    app.post("/riders/resend-otp", resendRiderOtp)

}