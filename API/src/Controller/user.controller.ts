// Rotehandler for user - /api/user

import { NextFunction, Request, Response } from "express";
import { throwError } from "../utils/error.handler";
import bcrypt from 'bcrypt'
import User, { UserSchema } from "../Models/user.model";

// export const userHandler = (req: Request, res: Response) => {
//   res.send('Hello World')
// }

// export const testHandler = (req: Request, res: Response) => {
//   res.send({
//     msg: 'Test Route'
//   })
// }


export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {

  if(!req.user) return next(throwError(401, 'Unauthorized access: User not authenticated'))

  if(req.user.id !== req.params.id) return next(throwError(401, 'You can only update your own account'))

  try {
    if(req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }

    const updatedUser: UserSchema | null = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      }
    }, { new: true }).lean() // .lean() converts the result into a plain javascript object

    if(!updatedUser) return res.status(401).json({ message: "User not found" })

    const { password, ...rest } = updatedUser as UserSchema;

    res.status(200).json(rest)


  } catch (error) {
    next(error)
  }
}