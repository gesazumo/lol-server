import express from 'express'
import PostModel from '../models/PostModel.js'

const postRouter = express.Router()

postRouter.post('', async (req, res, next) => {
    try{
        const newPost = new PostModel({
            ...req.body,
        })
        const result = await newPost.save()
        res.json(result)
    }
    catch(err) {
        next(err)
    }
})

export default postRouter 