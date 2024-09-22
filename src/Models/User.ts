import mongoose, { Schema } from 'mongoose'
const UserSchema: Schema = new Schema(
    {
      profileImage: {
        type: String,
        default: '',
      },
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
  const User = mongoose.model('User', UserSchema)
  export default User
  