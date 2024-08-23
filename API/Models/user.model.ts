import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export interface UserSchema extends Document {
  username: string,
  email: string,
  password: string
}

const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true
}
)

// Create a function to hash password
// userSchema.pre<UserSchema>("save", async function (next) {
//   const user = this as UserSchema

//   if(!user.isModified()) return next()

//   try {
//     const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR as string
//     const salt = await bcrypt.genSalt(parseInt(SALT_WORK_FACTOR))
//     const hash = await bcrypt.hash(user.password, salt)

//     user.password = hash
//   } catch (error) {
//     if(error instanceof Error) {
//       next(error)
//     } else {
//       next(new Error('An unexpected error occured'))
//     }
//   }

//   next()
// })

const User = mongoose.model<UserSchema>("User", userSchema)

export default User