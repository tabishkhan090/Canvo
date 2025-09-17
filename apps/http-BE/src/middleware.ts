import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "./config"
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token,JWT_SECRET)
    if(!decoded){
        res.json({
            message: "wrong credentials"
        })
        return;
    }
    //@ts-ignore
    req.userId = decoded._id;
    next();
}