import axios from 'axios'

const state = {
	eventInfo: {},
	notes: []
}

const mutations = {
	SET_EVENT_INFO(state, info) {
		state.eventInfo = info
		state.notes = state.eventInfo.Attentions.map(note => note.strHTMLDesc)
	}
}

const actions = {
	fetchEventInfo({ commit }, id) {
		return axios.get(`api/page/total/${id}`).then((res) => {
			const eventInfo = res.data
			commit('SET_EVENT_INFO', eventInfo)
			return eventInfo
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}