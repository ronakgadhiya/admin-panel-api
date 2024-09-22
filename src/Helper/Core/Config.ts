import dotenv from 'dotenv'
dotenv.config({})

export const NODE_ENV =process.env.NODE_ENV
export const SERVER_PORT =process.env.SERVER_PORT
export const SECRET =process.env.SECRET
export const APP_NAME =process.env.APP_NAME

export const FTP_USER =process.env.FTP_USER
export const FTP_PASSWORD =process.env.FTP_PASSWORD
export const FTP_HOST =process.env.FTP_HOST
export const FTP_PORT =process.env.FTP_PORT
export const DB_CONNECION =process.env.DB_CONNECION
export const UPLOAD_URL = process.env.UPLOAD_URL
