import { Document } from 'mongoose'

export interface Iuser extends Document {
    profile_picture?: string
    name: string
    email: string
    password: string
}