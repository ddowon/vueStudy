import { getEventInfo, getAllEventAttentions } from '~/event.api'

const state = {
	event: {
		msg: '',
		info: {},
		notes: [],
		forceUpdate: false
	}
}

const mutations = {
	SET_EVENT_INFO(state, info) {
		state.event.info = info
	},
	SET_EVENT_ATTENTIONS(state, attentions) {
		state.event.notes = attentions.map((note) => note.strHTMLDesc)
	},
	SET_EVENT_MESSAGE(state, msg) {
		state.event.msg = msg
	},
	SET_EVENT_FORCE_UPDATE(state, flag) {
		state.event.forceUpdate = flag
	}
}

const actions = {
	async fetchEventInfo({ commit }, eventId) {
		try {
			let res = await getEventInfo(eventId)
			commit('SET_EVENT_INFO', res.data)
		} catch (err) {
			throw err
		}
	},
	async fetchEventAttentions({ commit, dispatch }, eventId) {
		try {
			let res = await getAllEventAttentions(eventId)
			commit('SET_EVENT_ATTENTIONS', res.data)
		} catch (err) {
			// BE에서 전달해 줄 Error Code에 따른 메시지 수정 처리 필요
			dispatch('showAlertMsg', '이벤트 기간이 아닙니다.')
			commit('SET_EVENT_FORCE_UPDATE', true)
			throw err
		}
	},
	showAlertMsg({ commit, dispatch }, msg) {
		commit('SET_EVENT_MESSAGE', msg)
		dispatch('ui/showModal', 'pop_dialog', { root: true })
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