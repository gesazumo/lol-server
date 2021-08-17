import express from 'express'
import { FLEX_RANK, SOLE_RANK } from '../constant.js'
import {fetchGameInfo, fetchRecentGames, fetchUserInfo, fetchUserRankInfo} from '../riotApi.js'

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
        const {data} = await fetchRecentGames(req.params.id, req.query.beginIndex, req.query.endIndex)
        const recentGames = data
         
        const result = await Promise.all(recentGames.matches.map(async (game) => {
            const {data} = await fetchGameInfo(game.gameId)
            game["detail"] = data
            return game
        }))
        
        return res.json(result)
    }
    catch (err) {
        next(err)
    }  
})

userRouter.get('/recentGameSummary/:id', async (req, res, next) => {
    try{

        const avrCount = 5
        const {data} = await fetchRecentGames(req.params.id, 0, avrCount)
        const recentGames = data
         
        const result = await Promise.all(recentGames.matches.map(async (game) => {
            const {data} = await fetchGameInfo(game.gameId)
            game["detail"] = data
            return game
        }))

        let win = 0
        let lose = 0
        let kills = 0
        let deaths = 0
        let assists = 0

        result.forEach(game => {
            const userIndex = game.detail.participantIdentities.findIndex(pid => {
                return pid.player.accountId == req.params.id
            })

            const participants = game.detail.participants[userIndex]
            if(participants.stats.win) win++
            else lose++

            kills = kills + participants.stats.kills
            deaths = deaths + participants.stats.deaths
            assists = assists + participants.stats.assists
        })

        const summaryData = {
            win,
            lose,
            winRate: win/avrCount*100,
            killAvg:kills/avrCount,
            deathAvg:deaths/avrCount,
            assistAvg:assists/avrCount
        }
        return res.json(summaryData)
    }
    catch (err) {
        next(err)
    }
})


export default userRouter 