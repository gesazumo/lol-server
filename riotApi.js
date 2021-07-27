
import axios from 'axios'

const riotApiKey = 'RGAPI-0c03e642-899c-4f2e-899c-39d27d7ee30e'
const RIOT_API_URL = 'https://kr.api.riotgames.com/lol/'

function createInstance() {
	return axios.create({
		baseURL: RIOT_API_URL,
		headers: { 'X-Riot-Token': riotApiKey },
	})
}

const url = {
	search: 'summoner/v4/summoners/by-name/',
	rotation: 'platform/v3/champion-rotations',
	rank: 'league/v4/entries/by-summoner/',
	recentGames: 'match/v4/matchlists/by-account/',
	gameInfo: 'match/v4/matches/'
}

const instance = createInstance()

const fetchUserInfo = (userName) => {
    return instance.get(`${url.search}${userName}`)
}

const fetchRotationChamps = () => {
	return instance.get(`${url.rotation}`)
}

// fetchUserInfo에서 받아온 id 값사용
const fetchUserRankInfo = (id) => {
	return instance.get(`${url.rank}${id}`)
}

// fetchUserInfo에서 받아온 accountId 값사용
const fetchRecentGames = (id, beginIndex, endIndex) => {
	return instance.get(`${url.recentGames}${id}`, {
		params: { beginIndex, endIndex },
	})
}

const fetchGameInfo = (gameId) => {
	return instance.get(`${url.gameInfo}${gameId}`)
	
}

export {fetchUserInfo, fetchRotationChamps, fetchUserRankInfo, fetchRecentGames, fetchGameInfo}