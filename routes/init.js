import express from 'express'
import {fetchRotationChamps} from '../riotApi.js'

const initRouter = express.Router()

initRouter.get('/rotation', async (req, res) => {
    try{
        const {data} = await fetchRotationChamps()
        return res.json(data)
    }
    catch(err) {
        next(err)
    }
})

export default initRouter 