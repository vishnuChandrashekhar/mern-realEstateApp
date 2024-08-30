import { NextFunction, Request, Response } from "express";
import User, { UserSchema } from '../Models/user.model'
import bcryptjs from 'bcrypt'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
 
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser: UserSchema = new User({ username, email, password: hashedPassword })

  // Save the new user in database
  try {
    await newUser.save()
    res.status(201).json('User Created successfully')
  } catch (error: any) {
    next(error)
  }
}