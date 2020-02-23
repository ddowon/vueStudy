import client from '@/api/httpClient'

const END_POINT = '/api/page/total'

const getEventInfo = (eventId) => client.get(`${END_POINT}/${eventId}`)

// TODO: 유의사항만 가져오는 API 경로가 뭐였지... 사무실에서 swagger 확인하기
const getAllEventAttentions = (eventId) => client.get(`${END_POINT}/${eventId}`)

export {
	getEventInfo,
	getAllEventAttentions
}