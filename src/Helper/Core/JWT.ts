import { NextFunction, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import User from '../../Models/User'
import { IApiRequest } from '../../Types/Core'
import * as ApiResponse from './ApiResponse'
import { StatusCodes } from './ApiResponse'
import { SECRET } from './Config'
import Logger from './Logger'

const secretKey = SECRET || '123456789'

export const generateToken = (user: any) => {
  const token = jwt.sign(user, secretKey, { expiresIn: '30 days' })
  return token;
}

export const compareToken = (user: any) => {
  const decoded = jwt.verify(user, secretKey)
  return decoded;
}

export const verifyToken = async (req: IApiRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization']?.toString() ?? '';
    const decoded: any = jwt.verify(token, secretKey);    
    if (decoded) {
      const userFound = await User.findOne({ _id: decoded._id });
      if (userFound) {
        req.headers['userId'] = userFound._id;
        return next();
      }
      else {
        Logger.info(`User not found`)
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(ApiResponse.error([], StatusCodes.UNAUTHORIZED, 'User not found'));
      }
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json(ApiResponse.error([], StatusCodes.UNAUTHORIZED,"my errror"));
    }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json(ApiResponse.error(error, res.statusCode));
  }
};
