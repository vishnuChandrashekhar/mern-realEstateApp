import express, { Application } from 'express'
import { testHandler, updateUserInfo } from '../Controller/user.controller'
import { verifyToken } from '../utils/verifyUser'

const router = express.Router()

router.get('/test', testHandler)
router.post('/update/:id', verifyToken ,updateUserInfo)

export default router