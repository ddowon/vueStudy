const state = {
	count: 0
}

const mutations = {
	increment(state, payload) {
		state.count += payload
	},
	decrement(state) {
		state.count--
	}
}

const actions = {
	increment({ commit }, payload) {
		commit('increment', payload)
	},
	decrement: ({ commit }) => commit('decrement'),
	incrementAsync: ({ commit }) => {
		setTimeout(() => { commit('increment') }, 1000)
	}
}

const getters = {
	numType: state => state.count % 2 === 0 ? '짝수' : '홀수'
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
