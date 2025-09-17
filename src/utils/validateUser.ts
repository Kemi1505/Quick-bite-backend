import {object, string, ref} from 'yup'

export const createUserSchema = object({
    body: object({
        name: string().required("Name is Required"),
        password: string()
        .required("Password is required")
        .min(6, "Password should be 6 characters")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Only letters and numbers are allowed"),
    passwordConfirmation: string().oneOf(
        [ref("password")],
        "Password must match"
    ),
    email: string()
        .email("Must be a valid email")
        .required("Email is required"),
    role: string()
        .oneOf(["user", "vendor", "rider"], "Invalid role")
        .required("Role is required")
    })
    
})