import express, { Application,} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

mongoose
  .connect(process.env.MONGO||'')
  .then(() => {
  console.log(`Connected to the MongoDB`)
})
  .catch((err) => {
  console.error(err);
})

const app: Application = express()
const PORT: string | number = process.env.PORT || 3000



app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`)
})
