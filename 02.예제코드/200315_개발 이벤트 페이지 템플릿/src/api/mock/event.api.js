import attention from './data/attention.json'
import gameInfo from './data/gameInfo.json'

console.log('목업 데이터 로드 성공')

const getEventInfo = (eventId) => {
	return new Promise((resolve) => {
		let result = {}
		result.data = attention
		setTimeout(() => {
			resolve(result)
		}, 300)
	})
}

const getAllEventAttentions = (eventId) => {
	return new Promise((resolve) => {
		let result = {}
		result.data = attention
		setTimeout(() => {
			resolve(result)
		}, 300)
	})
}

export {
	getEventInfo,
	getAllEventAttentions
}