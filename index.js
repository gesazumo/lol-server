
import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'

import userRouter from './routes/user.js'
import initRouter from './routes/init.js'
import { errorHandler } from './util.js'
import "./env.js"

app.use(cors())

app.use('/init', initRouter)
app.use('/users', userRouter)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

