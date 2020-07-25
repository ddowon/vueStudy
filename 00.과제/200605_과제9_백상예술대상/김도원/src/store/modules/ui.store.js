const state = {
	toastMessage: '',
	openSignIn: false,
	openSignUp: false
}

const mutations = {
	SET_SIGNIN(state, payload) {
		state.openSignIn = payload
	},
	SET_SIGNUP(state, payload) {
		state.openSignUp = payload
	}
}

const actions = {
	setSignIn({ commit }, payload = true) {
		commit('SET_SIGNIN', payload)
	},
	setSignUp({ commit }, payload = true) {
		commit('SET_SIGNUP', payload)
	},
	toast(context, payload) {
		if (!payload.type) {
			this._vm.$toast.error(payload.message)
		} else {
			this._vm.$toast[payload.type](payload.message)
		}
	}
}

const getters = {
	openSignIn: (state) => state.openSignIn,
	openSignUp: (state) => state.openSignUp
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}