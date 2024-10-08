import express from 'express'
import { createListing } from '../Controller/listing.controller'
import { verifyToken } from '../utils/verifyUser'

const router = express.Router()

router.post('/create', verifyToken ,createListing)

export default router