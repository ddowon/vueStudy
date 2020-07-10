// 나중에 전부 울울 코드
const state = {
	currentPage: 1,
	openSignIn: false,
	openSignUp: false
}

const mutations = {
	SET_CURRENT_BOARD_PAGE(state, page) {
		state.currentPage = page
	},
	SET_OPEN_SIGNIN(state) {
		state.openSignIn = true
	},
	SET_OPEN_SIGNUP(state) {
		state.openSignUp = true
	},
	SET_CLOSE_SIGNIN(state) {
		state.openSignIn = false
	},
	SET_CLOSE_SIGNUP(state) {
		state.openSignUp = false
	},
}

const actions = {
	changeCurrentPage({ commit }, page) {
		commit('SET_CURRENT_BOARD_PAGE', page)
	},
	openSignIn({ commit }) {
		commit('SET_OPEN_SIGNIN')
	},
	openSignUp({ commit }) {
		commit('SET_OPEN_SIGNUP')
	},
	closeSignIn({ commit }) {
		commit('SET_CLOSE_SIGNIN')
	},
	closeSignUp({ commit }) {
		commit('SET_CLOSE_SIGNUP')
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