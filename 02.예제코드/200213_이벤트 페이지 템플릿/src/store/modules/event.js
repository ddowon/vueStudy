import { getEventInfo, getAllEventAttentions } from '@/api/event.api'

const state = {
	event: {
		msg: '',
		info: {},
		notes: []
	}
}

const mutations = {
	SET_EVENT_INFO(state, info) {
		state.event.info = info
	},
	SET_EVENT_ATTENTIONS(state, attentions) {
		state.event.notes = attentions
	},
	SET_EVENT_MESSAGE(state, msg) {
		state.event.msg = msg
	}
}

const actions = {
	async fetchEventInfo({ commit }, eventId) {
		try {
			const res = await getEventInfo(eventId)
			commit('SET_EVENT_INFO', res.data)
		} catch (err) {
			throw err
		}
	},
	async fetchEventAttentions({ commit, dispatch }, eventId) {
		try {
			const res = await getAllEventAttentions(eventId)
			commit('SET_EVENT_ATTENTIONS', res.data)
		} catch (err) {
			// BE에서 전달해 줄 Error Code에 따른 메시지 수정 처리 필요
			commit('SET_EVENT_MESSAGE', '이벤트 기간이 아닙니다.')
			dispatch('ui/showModal', 'pop_dialog', { root: true })
			throw err
		}
	}
}

const getters = {
	msg: (state) => state.event.msg,
	info: (state) => state.event.info,
	notes: (state) => state.event.notes
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}