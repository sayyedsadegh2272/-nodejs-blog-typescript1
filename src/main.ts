import express from "express";
import { Application , Request , Response , NextFunction } from "express";
import http, { Server } from "http";
import ApplicationRouter from "./routes/index.router";
import { ResponseMethod } from "./types/public.types";
import "./app.module"
const app: Application = express();
const server : Server = http.createServer(app);
const PORT = 5600
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(ApplicationRouter);
app.use((req : Request , res : Response , next : NextFunction) => {
    const response : ResponseMethod = {
        statusCode: 404,
        message: "Not Found Page",
    }
    return res.status(404).json(response)
})
app.use(( error : any , req : Request , res : Response , next : NextFunction) =>{
    const statusCode : number = +error?.status || 500
})
server.listen(PORT , () => {
    console.log(`Server Run over : http://localhost:${PORT}`);
})

