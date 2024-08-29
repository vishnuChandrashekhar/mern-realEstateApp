import express, { Application } from 'express'
import { userHandler, testHandler } from '../Controller/user.controller'

const router = express.Router()

router.get('/test', testHandler)

export default router