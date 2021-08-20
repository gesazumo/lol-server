
import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'
import mongoose from 'mongoose';

import userRouter from './routes/user.js'
import initRouter from './routes/init.js'
import { errorHandler } from './util.js'

app.use(cors())

app.use('/init', initRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
  return res.json({aa:1})
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect(
  'mongodb+srv://test:1234@cluster0.w6wsr.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
);
mongoose.Promise = global.Promise;

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

