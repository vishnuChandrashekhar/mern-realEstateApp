import express, { Application } from 'express'
import { updateUserInfo } from '../Controller/user.controller'
import { verifyToken } from '../utils/verifyUser'

const router = express.Router()

router.post('/update/:id', verifyToken ,updateUserInfo)

export default router