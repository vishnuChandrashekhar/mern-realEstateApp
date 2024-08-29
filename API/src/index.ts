import express, { Application } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import testRouter from './Routes/user.routes'
import authRouter from './Routes/auth.route'

dotenv.config()

const mongoURI = process.env.MONGO_URI as string;

mongoose
  .connect(mongoURI)
  .then(() => {
  console.log(`Connected to the MongoDB`)
})
  .catch((err) => {
  console.error(err);
})

const app: Application = express()
const PORT: string = process.env.PORT as string

app.use(express.json())
app.use('/api/user', testRouter)
app.use('/api/auth', authRouter)


app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`)
})
