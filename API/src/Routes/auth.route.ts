import express from 'express'
import { signup } from '../Controller/auth.controller'

const router = express.Router()

router.post('/signup', signup)

export default router 