import AUTH from '~/auth.api'
import router from '@/router'
import { appLocalStorage } from '@/utils/storage'

const state = {
	// 로그인 상태와 현재 로그인한 사용자의 정보를 저장
	token: null,
	user: null,
	isLogged: false
}

const mutations = {
	SET_CURRENT_USER(state, payload) {
		state.user = payload.user
		state.token = payload.token
		state.isLogged = true
		appLocalStorage.setItem('bs_token', payload.token)
	},
	CLEAR_USER(state) {
		state.user = null
		state.token = null
		state.isLogged = false
		appLocalStorage.removeItem('bs_token')
	}
}

const actions = {
	async checkAuth({ dispatch }, payload) {
		try {
			const res = await AUTH.checkAuth(payload)
			if (res.data.success) {
				dispatch('setUser', res.data)
			}
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	async signIn({ dispatch }, payload) {
		try {
			const res = await AUTH.signIn(payload)
			if (res) {
				dispatch('ui/toast', {
					type: 'success',
					message: `${res.data.user.name}${AUTH.msg.signIn_success}`
				}, { root: true })
				dispatch('setUser', res.data)
				dispatch('ui/setSignIn', false, { root: true })
			}
		} catch (err) {
			dispatch('ui/toast', { message: err }, { root: true })
		}
	},
	// common/SingUp.vue 내부 signUp 메서드로 signUp Action을 구현해 주세요.
	// 회원가입을 마치고 나면 반드시 signOut 처리를 해야합니다.
	signUp({ dispatch }, payload) {

	},
	setUser({ commit }, payload) {
		commit('SET_CURRENT_USER', payload)
	},
	signOut({ state, commit, dispatch }) {
		dispatch('ui/toast', {
			type: 'success',
			message: `${state.user.name}${AUTH.msg.signOut_success}`
		}, { root: true })
		commit('CLEAR_USER')
		router.push({ name: 'home' }).catch(() => {})
	}
}

const getters = {
	// 로그인 상태와 현재 로그인한 사용자의 정보를 가져옴
	currentUser: (state) => state.user,
	token: (state) => state.token,
	isLogged: (state) => state.isLogged
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}