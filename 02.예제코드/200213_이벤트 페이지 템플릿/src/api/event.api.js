import client from '@/api/httpClient'

const END_POINT = '/api/page'

const getEventInfo = (eventId) => client.get(`${END_POINT}/total/${eventId}`)

const getAllEventAttentions = (eventId) => client.get(`${END_POINT}/attention/${eventId}`)

export {
	getEventInfo,
	getAllEventAttentions
}