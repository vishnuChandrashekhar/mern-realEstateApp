import express, { Application } from 'express'
import { deleteUser, updateUserInfo } from '../Controller/user.controller'
import { verifyToken } from '../utils/verifyUser'

const router = express.Router()

router.post('/update/:id', verifyToken ,updateUserInfo)
router.delete('/delete/:id', verifyToken, deleteUser)

export default router