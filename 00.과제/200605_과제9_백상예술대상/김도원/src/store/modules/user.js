import axios from 'axios'
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI

const state = {
	// 로그인 상태와 현재 로그인한 사용자의 정보를 저장
	token: null,
	user: null,
	isLogged: false
}

const mutations = {
	SET_CURRENT_USER(state, payload) {
		// 결과값을 서버에서 성공적으로 받았을 경우만 수행
		if (payload.success && payload.accessToken) {
			state.user = payload.user
			state.token = payload.accessToken
			state.isLogged = true
		} else {
			// 로그아웃 구현 하시고요.지금부터
			// 회원이면 (= 로그인이면) 글쓰기 버튼 보이게 해서 글작성 구현해주세요. 지금부터
			this.commit('CLEAR_USER')
		}
	},
	// 힌트 나가용
	CLEAR_USER(state) {
		state.user = null
		state.token = null
		state.isLogged = false
		console.log(state.user)
	}
}

const actions = {
	// 로그인 컴포넌트에서 입력한 이메일, 비밀번호 값
	signIn({ commit, dispatch }, payload) {
		axios.post(`${API_URI}/auth/signin`, {
			email: payload.email,
			password: payload.password
		})
		.then((res) => {
			if (res.data) {
				commit('SET_CURRENT_USER', res.data)
				dispatch('ui/closeSignIn', null, { root: true })
			}
		}).catch((err) => {
			console.log(err)
		})
	},
	signOut({ commit }) {

		// 
		commit('CLEAR_USER')

		console.log('로그아웃 완료!')
	}
}

const getters = {
	// 로그인 상태와 현재 로그인한 사용자의 정보를 가져옴
	currentUser(state) {
		return state.user
	},
	currentToken(state) {
		return state.token
	},
	isLogged(state) {
		return state.isLogged
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}