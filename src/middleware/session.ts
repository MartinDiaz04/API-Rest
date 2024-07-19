import {Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";
interface RequestExt extends Request{
    user?:string | JwtPayload
}


const checkJwt = (req:RequestExt, res:Response, next: NextFunction) => {
    try{
        const jwtByUser = req.headers.authorization || '';
        const jwt = jwtByUser.split(" ").pop();
        const isUser = verifyToken(`${jwt}`);
        console.log(isUser)
        if(!isUser) {
            res.status(401);
            res.send({message:"No autorizado"});
        }else{
            req.user = isUser;
            next();
        }
        
    }catch(e){
        console.log({e})
        res.status(400).send({message:"Session no valida"})
    }
}

export {checkJwt}