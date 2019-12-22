const state = {
	currentUser: null
}

const mutations = {
	userStatus(state, user) {
		if (user) {
			state.currentUser = user.email
		} else {
			state.currentUser = null
		}
	}
}

const actions = {
	setUser({ commit }, user) {
		commit('userStatus', user)
	}
}

const getters = {
	currentUser: state => state.currentUser
}

export default {
	state,
	mutations,
	getters,
	actions
}