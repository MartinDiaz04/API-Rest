import {Request, Response} from "express";
import {registerNewUser, loginUser} from "../services/auth.services";

const registerCtrl = async ({body}:Request, res:Response) => {
    const responseUser = await registerNewUser(body);
    res.send(responseUser)
}

const loginCtrl = async ({body}:Request, res:Response) => {
    const {email, password} = body;
    const responseUser = await loginUser({email, password});

    if(responseUser==="Invalid password"){
        res.status(403)
        res.send(responseUser)
    }else{
        res.send(responseUser)
    }
}

export {loginCtrl, registerCtrl}