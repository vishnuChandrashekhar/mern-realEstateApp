import express, { Application } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routes from './Routes/user.routes'

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

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`)

  // initializing Routes
  routes(app)
})
