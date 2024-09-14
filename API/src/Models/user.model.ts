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

const User = mongoose.model<UserSchema>("User", userSchema)

export default User