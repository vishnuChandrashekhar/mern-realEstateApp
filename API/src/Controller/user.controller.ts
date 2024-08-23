// Rotehandler for user - /api/user

import { Request, Response } from "express";

export const userHandler = (req: Request, res: Response) => {
  res.send('Hello World')
}

export const testHandler = (req: Request, res: Response) => {
  res.send({
    msg: 'Test Route'
  })
}