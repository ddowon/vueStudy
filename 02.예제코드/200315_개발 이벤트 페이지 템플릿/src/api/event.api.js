import client from '~/httpClient'

const END_POINT = '/api/page'

const getEventInfo = (eventId) => client.get(`${END_POINT}/total/${eventId}`, { errorHandle: false })

const getAllEventAttentions = (eventId) => client.get(`${END_POINT}/attention/${eventId}`, { errorHandle: false })



// // 이벤트페이지별 이벤트 바인딩
// eventObj.bindEvents.Update(0); 

export {
	getEventInfo,
	getAllEventAttentions
}