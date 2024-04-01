import express, {Request, Response} from "express"
import cors from "cors"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import http from "http"
import dotenv from "dotenv"
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	legacyHeaders: false,
})

app.use(limiter)
app.use(cors({ origin: "*"}))
app.use(helmet())

app.get("/", (req: Request, res: Response)=>{
    return res.status(200).json("Hello, world!")
})

function start(){
    const server = http.createServer(app)
    server.listen(port, ()=>{
        console.log(`server running ${process.env.NODE_ENV} mode on port ${(server.address() as {port: number}).port}...`)
    })
    return server
}

const server = start()

export default server