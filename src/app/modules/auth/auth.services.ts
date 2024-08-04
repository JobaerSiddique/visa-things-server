import  bcrypt  from 'bcrypt';
import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { TUser } from "./auth.interface"
import { User } from "./auth.model"
import config from '../../config';
import { createToken } from './auth.utils';



const createUserDB = async (payload:TUser)=>{
    const findUsers = await User.findOne({email:payload.email})
    if(findUsers){
        throw new AppError(409,"User already exists")
    }

    const newUser = await User.create(payload)
    return newUser;
}

const loginUserFromDB = async(paylaod:string)=>{
    
    const user = await User.findOne({email:paylaod.email})
    
    if(!user){
        throw new AppError(httpStatus.FORBIDDEN,"Invalid credentials")
    }
    if(!user.isActive === 'false' || user.isBlocked === "block"){
        throw new AppError(httpStatus.FORBIDDEN,"User is not active or blocked")
    }

    const isMatch = await bcrypt.compare(paylaod.password, user.password);
    if(!isMatch){
        throw new AppError(httpStatus.FORBIDDEN,"Invalid credentials")
    }
    const jwtPayload = {
        userId: user._id,
        role: user.role,
      };
      const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
      );
    
      const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
      );

      return {user,accessToken,refreshToken };
}

const getAllUsersDB = async () => {
    const users = await User.find({isDeleted: false})
    return users;
}

const createAdminDB = async (payload:TUser) => {
    const findUsers = await User.findOne({email:payload.email,})
    if(findUsers){
        throw new AppError(409,"User already exists")
    }
    payload.role= "admin"
    const newAdmin = await User.create(payload);
    await newAdmin.save()
    return newAdmin;
}
export const AuthServices = {
    createUserDB,
    loginUserFromDB,
    getAllUsersDB,
    createAdminDB
}