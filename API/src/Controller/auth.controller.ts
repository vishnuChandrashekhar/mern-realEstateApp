import { NextFunction, Request, Response } from "express";
import User, { UserSchema } from '../Models/user.model'
import bcryptjs from 'bcrypt'
import { throwError } from '../utils/error.handler'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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


export const signin = async (req: Request, res: Response, next: NextFunction) => {
  
  const { email, password } = req.body

  try {
    const validUser: UserSchema | null = await User.findOne({ email: email })

    if(!validUser) {
      return next(throwError(404, 'User Not Found'))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if(!validPassword) {
      return next(throwError(401, "Invalid Password"))
    }

    // create token for sessions
    const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET || 'fallback_secret_word')

    const { password:_, ...rest } =  validUser.toObject()

    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
  } catch (error) {
    next(error)
  }
}