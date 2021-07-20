
import axios from 'axios'

const riotApiKey = 'RGAPI-6db6a9f2-98d7-45ad-91f8-48e5f290d722'
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
	recentGames: 'match/v4/matchlists/by-account/'
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

export {fetchUserInfo, fetchRotationChamps, fetchUserRankInfo, fetchRecentGames}