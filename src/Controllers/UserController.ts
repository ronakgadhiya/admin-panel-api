import bcrypt from 'bcrypt';
import { Response } from 'express';
import * as ApiResponse from '../Helper/Core/ApiResponse';
import { StatusCodes } from '../Helper/Core/ApiResponse';
import Logger from '../Helper/Core/Logger';
import User from '../Models/User';
import { IApiRequest } from '../Types/Core';
import { createUser, userLogin } from '../Validations/UserValidation';

export const CreateUser = async (req: IApiRequest, res: Response) => {
    try {
        const createUserResult = await createUser.validateAsync(req.body)
        const userEmail = await User.findOne({ email: createUserResult.email })
        if (userEmail) {
            Logger.info(`User Already Exists`)
            return res.status(StatusCodes.BAD_REQUEST).json(ApiResponse.success(
                []
                , StatusCodes.BAD_REQUEST,
                `${createUserResult.email} User Already Exists`
            ))
        }

        const passwordHash = await bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(createUserResult.password, salt));

        const newUser = await User.create({
            name: createUserResult.name,
            email: createUserResult.email,
            phoneNumber: createUserResult.phoneNumber,
            password: passwordHash
        })
        Logger.info(`User Created SuccessFully`)
        return res.status(StatusCodes.CREATED).json(ApiResponse.success(
            newUser,
            StatusCodes.CREATED,
            `User Created SuccessFully`
        ));

    } catch (error: any) {
        Logger.error(error.isJoi === true ? error.details : error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse.error(
            error.isJoi === true ? error.details : error,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        ));
    }
}


export const UserLogin = async (req: IApiRequest,res:Response) => {
    try{
        const userloginValidate = await userLogin.validateAsync(req.body)
        if(!userloginValidate){
            return res.status(StatusCodes.BAD_REQUEST).json(ApiResponse.error(
                [],
                StatusCodes.BAD_REQUEST,
                "Invalid Request Error."
            ))
        }
        return true;
    }catch(error:any){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse.error(
            error.isJoi === true ? error.message : error,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        ))
    }
}

