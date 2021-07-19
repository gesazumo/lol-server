
import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'

import {fetchUserInfo, fetchRotationChamps, fetchUserRankInfo} from './riotApi.js'


app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello Riot API World!')
})

app.get('/searchUser/:userName', async (req, res) => {
    try{
        const {data} = await fetchUserInfo(req.params.userName)
        return res.json(data)
    }
    catch (error) {
        console.log(error.response.data)
        return res.json(error.response.data)
    }  
})

app.get('/getUserInfo/:id', async (req, res) => {
  try{
      const {data} = await fetchUserRankInfo(req.params.id)
      return res.json(data)
  }
  catch (error) {
      console.log(error.response.data)
      return res.json(error.response.data)
  }  
})

app.get('/rotation', async (req, res) => {
  try{
      const {data} = await fetchRotationChamps()
      return res.json(data)
  }
  catch (error) {
      console.log(error.response.data)
      return res.json(error.response.data)
  }  
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})