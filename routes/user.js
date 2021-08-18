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

        const summary = {
            totalWin:0,
            totalLose:0,
            totalKills: 0,
            totalDeaths: 0,
            totalAssists: 0,
            gameList: [
                {
                    win: true,
                    kill:0,
                    deaths: 0,
                    asi: 0,
                    champion: 0,
                    teamKill: 0,
                    line: ''
                }
            ]   
        }
        
        let totalKills = 0
        result.forEach(game => {
            const userIndex = game.detail.participantIdentities.findIndex(pid => {
                return pid.player.accountId == req.params.id
            })

            const participants = game.detail.participants[userIndex]
            if(participants.stats.win) summary.win++
            else summary.totalLose++

            summary.totalKills = summary.totalKills + participants.stats.kills
            summary.totalDeaths = summary.totalDeaths + participants.stats.deaths
            summary.totalAssists = summary.totalAssists + participants.stats.assists

            summary.gameList.push({
                win: participants.stats.win,
                kills: participants.stats.kills,
                deaths: participants.stats.deaths,
                assists: participants.stats.assists,
                championId: participants.championId,
                line: ''
            })
            
            const gameKill = game.detail.participants
            .filter(prt => {
                return participants.teamId == prt.teamId
            })
            .map(prt => {
                return prt.stats.kills
            })
            .reduce((arr, cntKill) => {
                return arr + cntKill
            })

            totalKills = totalKills + gameKill
        })

        const summaryData = {
            teamTotalKills : totalKills,
            ...summary
        }
        return res.json(summaryData)
    }
    catch (err) {
        next(err)
    }
})


export default userRouter 