import {object, string} from 'yup'

export const createSessionSchema = object({
    body: object({
        password: string()
        .required("Password is required")
        .min(6, "Password should be 6 characters")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Only letters and numbers are allowed"),
    email: string()
        .email("Must be a valid email")
        .required("Email is required")
    })
})
