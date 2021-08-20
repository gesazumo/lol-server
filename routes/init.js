import express from 'express'
import PostModel from '../models/PostModel.js'
import {fetchRotationChamps} from '../riotApi.js'

const initRouter = express.Router()

initRouter.get('/rotation', async (req, res, next) => {
    // try{
    //     const post = new PostModel({
    //         title: '123',
    //         author: 'author',
    //         body: 'bodydydydyy',
    //     })
    //     await post.save()
    //     const {data} = await fetchRotationChamps()
    //     return res.json(data)
    // }
    // catch(err) {
    //     next(err)
    // }
    return res.json({init:true})
})

export default initRouter 