import express from 'express'
import PostModel from '../models/PostModel.js'
import { getFilter } from '/project/vue-til-server/util.js'

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

postRouter.get('', async (req, res, next) => {
    try {
        const {from, to, recruitPosition, queueType, voice} = req.query

        const filter = {
            recruitPosition,
            queueType,
            voice : voice && (voice == 'true' ? true : false)
        }

        const posts = await PostModel.find(getFilter(filter))
        .sort({createDate:'desc'}).
        skip(Number(from)).
        limit((Number(to)-Number(from)))
        
        posts.length > 0 ? res.json(posts) : res.status(204).send()
    }
    catch(err) {
        next(err)
    }
})

postRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const post = await PostModel.findById(id)
        return res.json(post)
    }
    catch(err) {
        next(err)
    }
})

export default postRouter 