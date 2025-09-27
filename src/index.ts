import express from "express";
import config from "config";
import connect from "./db/connect";
import authRoutes from "./routes/authRoutes"
import otpRoutes from "./routes/otpRoutes"
import passRoutes from "./routes/passwordRoutes"
import cookieParser from "cookie-parser";
import cors from 'cors';

const port = config.get('port') as number
const host = config.get('host') as string
const corsOptions = {
    origin: [
        "https://quickbite-three-red.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    credentials: true
}
const app = express()

app.use(cors(corsOptions));
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