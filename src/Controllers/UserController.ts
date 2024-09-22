import { Response } from 'express';
import * as ApiResponse from '../Helper/Core/ApiResponse';
import { StatusCodes } from '../Helper/Core/ApiResponse';
import Logger from '../Helper/Core/Logger';
import { IApiRequest } from '../Types/Core';


export const CreateUser = (req: IApiRequest, res: Response) => {
    try {
        return req;
    } catch (error: any) {
        Logger.error(error.isJoi === true ? error.details : error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse.error(
            error.isJoi === true ? error.details : error,
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message
        ));
    }
}
