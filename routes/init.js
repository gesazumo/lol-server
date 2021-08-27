import express from 'express'
import {fetchRotationChamps} from '../riotApi.js'

const initRouter = express.Router()

initRouter.get('/rotation', async (req, res, next) => {
    try{
        const {data} = await fetchRotationChamps()
        return res.json(data)
    }
    catch(err) {
        // 에러나면 
        // util.js의 errorHandler로 형식맞춰서 던저야댐
        next(err)
    }
})

export default initRouter 