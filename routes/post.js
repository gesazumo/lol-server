import express from 'express'
import PostModel from '../models/PostModel.js'

const postRouter = express.Router()

postRouter.post('', async (req, res, next) => {
    try {
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
        const {page, ...filter} = req.query
        const count = 12
        
        if(filter.voice) filter.voice = (filter.voice == 'true')

        const [posts, totalCount] = await Promise.all([
            PostModel.find(filter).sort({createDate:'desc'}).skip((Number(page)-1) * count).limit(count),
            PostModel.countDocuments(filter),
        ])
        
        totalCount > 0 ? res.json({posts, totalCount}) : res.status(204).send()
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