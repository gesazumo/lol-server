import express from 'express'
import BoardModel from '../models/BoardModel.js'

const boardRouter = express.Router()

boardRouter.post('', async (req, res, next) => {
    try {
        const newBoard = new BoardModel({
            title: "제목",
            writer: "글쓴이",
            body: "내용",
            like: 0
        })
        const result = await newBoard.save()
        res.json(result)   
    }
    catch(err) {
        next(err)
    }
})

boardRouter.get('', async (req, res, next) => {
    try {
        const boards = await BoardModel.find().sort({createDate:'desc'})
        
        res.json(boards)
    }
    catch(err) {
        next(err)
    }
})

boardRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params
        const board = await BoardModel.findById(id)
        return res.json(board)
    }
    catch(err) {
        next(err)
    }
})
 
export default boardRouter 