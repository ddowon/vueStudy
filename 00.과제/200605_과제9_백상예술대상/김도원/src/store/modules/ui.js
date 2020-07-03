// 나중에 전부 울울 코드
const state = {
	currentPage: 1
}

const mutations = {
	SET_CURRENT_BOARD_PAGE(state, page) {
		state.currentPage = page
	}
}

const actions = {
	changeCurrentPage({ commit }, page) {
		commit('SET_CURRENT_BOARD_PAGE', page)
	},
}

const getters = {
	currentPage: (state) => state.currentPage
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}