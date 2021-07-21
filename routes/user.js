import express from 'express'
import { FLEX_RANK, SOLE_RANK } from '../constant.js'
import {fetchRecentGames, fetchUserInfo, fetchUserRankInfo} from '../riotApi.js'

const userRouter = express.Router()

userRouter.get('/find/:userName', async (req, res, next) => {
    try{
      const {data} = await fetchUserInfo(req.params.userName)
      return res.json(data)
    }
    catch(err) {
        next(err)
    }
})

userRouter.get('/info/:id', async (req, res, next) => {
    try{
        const {data} = await fetchUserRankInfo(req.params.id)
        const rankData = {
            solo: {},
            flex: {}
        }
        data.forEach((rankInfo) => {
            if(rankInfo.queueType == SOLE_RANK) rankData.solo = rankInfo
            if(rankInfo.queueType == FLEX_RANK) rankData.flex = rankInfo
        })
        return res.json(rankData)
    }
    catch (err) {
        next(err)
    }  
})

userRouter.get('/recentGames/:id', async (req, res, next) => {
    try{
        const {data} = await fetchRecentGames(req.params.id, req.params.beginIndex, req.params.endIndex)
        return res.json(data)
    }
    catch (err) {
        next(err)
    }  
})


export default userRouter 