import { Document } from 'mongoose'

export interface Iuser extends Document {
    name: string
    phoneNumber:string
    email: string
    password: string
}