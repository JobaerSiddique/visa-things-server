import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";



const createUser = catchAsync(async(req,res)=>{
    const user  = req.body
    const result = await AuthServices.createUserDB(user);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User created successfully",
        data:result
    })
})

const loginUser = catchAsync(async(req,res)=>{
    const users = req.body;
    const result = await AuthServices.loginUserFromDB(users);
    const {user,accessToken,refreshToken} = result;
    res.cookie('refreshToken',refreshToken)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User logged in successfully",
        data:{user, accessToken}
    })
});

const getAllUser = catchAsync(async (req,res) => {
    const result = await AuthServices.getAllUsersDB()
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User  successfully",
        data:result
    })
});


const createAdmin = catchAsync(async (req,res) => {
    const admin = req.body;
    const result = await AuthServices.createAdminDB(admin);
    console.log(result)
});   
export const AuthController = {
    createUser,
    loginUser,
    getAllUser,
    createAdmin
}