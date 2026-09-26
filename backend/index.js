import express from "express"
import dbConnection from "./src/api/config/db.js"
import env from "./src/infrastructure/env.js"
import createRouter from "./src/infrastructure/route.js"
import cors from "cors"
import { errorHandler } from "./src/api/interface/lib/httpError.js"

const app = express()
app.use(
    cors({
      origin: "*",
      methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
      credentials: true,
      allowedHeaders: "Content-Type, Authorization",
    })
  );

app.use(express.json())
app.use("/v1",createRouter())
app.use(errorHandler) // JSON errors (bad uploads, bad JSON, unexpected failures) instead of Express's HTML page

// Connect first, then accept requests (same connection error handling as before).
await dbConnection()
app.listen(env.PORT,()=>{
    console.log("PORT Connected", env.PORT)
})
