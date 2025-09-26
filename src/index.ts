import express from "express";
import config from "config";
import connect from "./db/connect";
import authRoutes from "./routes/authRoutes"
import otpRoutes from "./routes/otpRoutes"
import passRoutes from "./routes/passwordRoutes"
import cookieParser from "cookie-parser";

const port = config.get('port') as number
const host = config.get('host') as string

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.listen(port, host , ()=>{
    console.log(`Listening on http://${host}:${port}`)

    connect()

    authRoutes(app)
    otpRoutes(app)
    passRoutes(app)
})