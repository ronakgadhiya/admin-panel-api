import mongoose, { Schema } from 'mongoose'
import { Iuser } from '../Types/Iuser'
const UserSchema: Schema = new Schema(
    {
      name: {
        type: String,
        default: '',
      },
      phoneNumber: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  )
  const User = mongoose.model<Iuser>('User', UserSchema)
  export default User
  