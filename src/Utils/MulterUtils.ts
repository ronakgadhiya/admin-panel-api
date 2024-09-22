import multer, { MulterError } from 'multer'
import { NextFunction, Response } from 'express'
import { IApiRequest } from '../Types/Core'
import { StatusCodes } from '../Helper/Core/ApiResponse'
import * as ApiResponse from '../Helper/Core/ApiResponse'
import path from 'path'

// export const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 200 * 1024 * 1024,
//   },
// })

export const uploadDocument = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

//local

// export const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null,"images");
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   }
// });

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpeg', '.jpg', '.png', '.mp4', '.mov', '.avi', '.mkv', '.gif', '.3gp', '.flv'].includes(ext)) {
      cb(null, 'uploads');
    } else {
      cb(null, `Unsupported file type`);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1)}${ext}`);
  }
});


export const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv|3gp|flv/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images and videos are allowed'));
  }
});


//local

export const uploadError = (error: any, req: IApiRequest, res: Response, next: NextFunction) => {
  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(StatusCodes.REQUEST_TOO_LONG)
        .json(ApiResponse.error(error, StatusCodes.REQUEST_TOO_LONG, 'Please upload file within Mb size'))
    }

    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ApiResponse.error(error, StatusCodes.BAD_REQUEST, 'Invalid details provided'))
    }
  }

  return next(error)
}
