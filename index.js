
import express from 'express'
const app = express()
const port = 3000

import axios from 'axios'

const riotApiKey = 'RGAPI-11ee0d58-7e62-4e1e-9916-d6e67e551861'
const RIOT_API_URL = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/'

import {userInfo} from './riotApi.js'

function createInstance() {
	return axios.create({
		baseURL: RIOT_API_URL,
		headers: { 'X-Riot-Token': riotApiKey },
	})
}

const url = {
	search: 'by-name/',
}

 const instance = createInstance()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/searchUser/:userName', (req, res) => {
    console.log(req.params.userName)
    userInfo()
    instance.get(`${url.search}${req.params.userName}`).then(ress => {
        return res.json(ress.data)
    })
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})