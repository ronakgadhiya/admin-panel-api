import bcrypt from 'bcrypt';
import { Response } from 'express';
import mongoose from 'mongoose';
import * as ApiResponse from '../Helper/Core/ApiResponse';
import { StatusCodes } from '../Helper/Core/ApiResponse';
import * as JWT from '../Helper/Core/JWT';
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


export const UserLogin = async (req: IApiRequest, res: Response) => {
    try {
        const userloginValidate = await userLogin.validateAsync(req.body)
        if (!userloginValidate) {
            return res.status(StatusCodes.BAD_REQUEST).json(ApiResponse.error(
                [],
                StatusCodes.BAD_REQUEST,
                "Invalid Request Error."
            ))
        } else {
            const userDetails: any = await User.findOne({ email: userloginValidate.email });
            if (userDetails) {
                const validatedPassword = await bcrypt.compare(userloginValidate.password, userDetails.password);
                if (!validatedPassword) {
                    Logger.info(`Invalid email or password.`)
                    return res
                        .status(StatusCodes.BAD_REQUEST)
                        .json(ApiResponse.error([], StatusCodes.BAD_REQUEST, 'Invalid email or password.'));
                } else {
                    const token = JWT.generateToken(userDetails._doc);
                    userDetails.password = undefined;
                    Logger.info(`Admin login successfully`)
                    return res
                        .status(StatusCodes.OK)
                        .json(
                            ApiResponse.success(
                                { userDetails, token: token },
                                StatusCodes.OK,
                                'Admin login successfully',
                            ),
                        );
                }
            } else {
                Logger.info(`Please register first then try login`)
                return res
                    .status(StatusCodes.NOT_FOUND)
                    .json(ApiResponse.error([], StatusCodes.NOT_FOUND, 'Please register first then try login'));
            }
        }


    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse.error(
            error.isJoi === true ? error.message : error,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        ))
    }
}

export const FetchAllUser = async (req: IApiRequest, res: Response) => {
    try {
        const name = req.query.search ?? "";
        const page = parseInt(req.query.page as string) || 1;
        const size = parseInt(req.query.size as string) || 10;
        const skip = (page - 1) * size;
        const matchStage: any = {
            $or:
                [

                    { companyName: { $regex: name, $options: 'i' } },
                    { dealerName: { $regex: name, $options: 'i' } },
                    { phoneNumber: { $regex: name, $options: 'i' } },
                    { email: { $regex: name, $options: 'i' } },
                    { address: { $regex: name, $options: 'i' } },
                ]

        };
        const userPipeLine = [
            {
                $match: matchStage
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    phoneNumber: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            },
            {
                $skip: skip
            },
            {
                $limit: size
            }
        ]

        const usersDetails = User.aggregate(userPipeLine)
        const userDetailsCount = User.countDocuments(matchStage)
        const [users, totalRows] = await Promise.all([usersDetails, userDetailsCount])
        Logger.info(`All dealers fetched successfully`)
        return res
            .status(StatusCodes.OK)
            .json(ApiResponse.success({
                data: users,
                currentPage: page,
                totalRows: totalRows,
                currentSize: size
            }, StatusCodes.OK, 'All dealers fetched successfully'));
    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse.error(
            error.isJoi === true ? error.message : error,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        ))
    }
}

export const FetchUserById = async (req: IApiRequest, res: Response) => {
    try {
        const userId = mongoose.Types.ObjectId(req.params.userId);
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json(ApiResponse.error(
                [],
                StatusCodes.BAD_REQUEST,
                `${userId} is Invalid`
            ))
        }

        const userDetail = await User.findOne({ _id: userId })
        if (!userDetail) {
            return res.status(StatusCodes.NOT_FOUND).json(ApiResponse.error(
                [],
                StatusCodes.NOT_FOUND,
                `user not found`
            ))
        }
        return res.status(StatusCodes.OK).json(ApiResponse.success(
            userDetail,
            StatusCodes.OK,
            `userDetails Fetch Successfully.`
        ))

    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse.error(
            error.isJoi === true ? error.message : error,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        ))
    }
}