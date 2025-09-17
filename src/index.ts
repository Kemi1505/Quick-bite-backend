import express from "express";
import config from "config";
import connect from "./db/connect";
import routes from "./routes/routes";
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

    routes(app)
})