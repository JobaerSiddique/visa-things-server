import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";





const auth =()=>{
    return catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.headers.authorization
        console.log(token)
        if(!token){
            throw new Error("Token not Found")
        }

        let decoded;
        try {
            decoded = jwt.verify(token,config.jwt_access_secret as string) as JwtPayload
           
        } catch (error) {
            throw new Error("Not Valid Token")
        }

        req.user= decoded;
        next()
        
      
    })
}


export default auth;