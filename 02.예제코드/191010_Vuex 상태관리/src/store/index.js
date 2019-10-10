import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0
	},
	getters: {
		numType: state => state.count % 2 === 0 ? '짝수' : '홀수'
	},
	mutations: {
		increment(state) {
			state.count++;
		},
		decrement(state) {
			state.count--;
		}
	},
	actions: {
		increment: ({ commit }) => commit('increment'),
		decrement: ({ commit }) => commit('decrement'),
		incrementAsync: ({ commit }) => {
			setTimeout(() => { commit('increment') }, 1000);
		}
	}
})
