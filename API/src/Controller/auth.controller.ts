import { Request, Response } from "express";
import User, { UserSchema } from '../Models/user.model'
import bcryptjs from 'bcrypt'

export const signup = async (req: Request, res: Response) => {
 
  const { username, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser: UserSchema = new User({ username, email, password: hashedPassword })

  // Save the new user in database
  try {
    await newUser.save()
    res.status(201).json('User Created successfully')
  } catch (error: any) {
    res.status(500).send(error.message)
  }
  
}