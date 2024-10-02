// Rotehandler for user - /api/user

import { NextFunction, Request, Response } from "express";

export const userHandler = (req: Request, res: Response) => {
  res.send('Hello World')
}

export const testHandler = (req: Request, res: Response) => {
  res.send({
    msg: 'Test Route'
  })
}


export const updateUserInfo = (req: Request, res: Response, next: NextFunction) => {
  
} 