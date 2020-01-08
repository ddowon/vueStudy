import axios from 'axios'
import router from '@/router'
import users from '@/store/users'
import { API } from '@/constant'
import lastProjects from '@/store/lastProjects.json'

const state = {
	events: [],
	projects: [],
	users: users,
	lastProjects: lastProjects,
	alert: {
		status: false,
		type: 'error',
		msg: ''
	}
}

const mutations = {
	SET_ALERT_MSG(state, payload) {
		state.alert.status = true
		state.alert.type = payload.type
		state.alert.msg = payload.msg
		setTimeout(() => {
			state.alert.status = false
		}, 3000)
	},
	SET_CALENDAR_EVENTS(state, payload) {
		state.events.push(payload)
	},
	SET_PROJECTS(state, payload) {
		state.projects = payload
		state.users.map((user) => {
			let jobs = state.projects.filter((item) => {
				return item[user.part] == user.name
			})
			if (jobs.length) {
				user.jobs = jobs.sort((a, b) => {
					return new Date(a.open) - new Date(b.open)
				})
			}
		})
	},
	SET_LAST_PROJECTS(state, payload) {
		state.users.map((user) => {
			let lastProjects = payload.filter((item) => {
				return item[user.part] == user.name
			})
			if (lastProjects.length) {
				user.lastProjects = lastProjects.sort((a, b) => {
					return new Date(a.open) - new Date(b.open)
				})
			}
		})
	},
	RESET_ALL_PROJECTS(state) {
		state.events = []
		state.projects = []
		state.users.map((user) => {
			user.jobs = []
		})
	}
}

const actions = {
	fetchProject({ commit, getters }) {
		commit('RESET_ALL_PROJECTS')
		commit('SET_ALERT_MSG', {
			type: 'info',
			msg: '구글 일정표 데이터를 불러오는 중입니다.'
		})
		axios.get(API.ALL_PROJECT_URI)
		.then((res) => {
			res.data.map((item) => {
				let result = {
					name: `[${item.gameName}] ${item.subject}`,
					details: `<p class="badges"><span class="badge_status">${item.status}</span><span class="badge_spec">${item.spec}</span></p><dl class="desc"><dt>오픈일</dt><dd>${item.open}</dd><dt>사업</dt><dd>${item.business}</dd><dt>디자인</dt><dd>${item.design}</dd><dt>UI</dt><dd>${item.ui}</dd><dt>개발</dt><dd>${item.dev}</dd></dl>`,
					start: item.open,
					end: item.open,
					color: getters.getGameColor(item.gameName)
				}
				commit('SET_CALENDAR_EVENTS', result)
			})
			commit('SET_PROJECTS', res.data)
			commit('SET_ALERT_MSG', {
				type: 'success',
				msg: '구글 일정표 데이터 조회에 성공하였습니다.'
			})
		})
		.catch(err => {
			if (err.response.status != 500) {
				commit('SET_ALERT_MSG', {
					type: 'error',
					msg: '예기치 못한 오류가 발생했습니다. 잠시 후 다시 검색해 주세요.'
				})
			}
		})
	},
	fetchLastProject({ state, commit, getters }, payload) {
		let selectYear = payload || '' 

		state.lastProjects.map((item) => {
			if (item.open.includes(selectYear)) {
				
			let result = {
					name: `[${item.gameName}] ${item.subject}`,
					details: `<p class="badges"><span class="badge_status">${item.status}</span><span class="badge_spec">${item.spec}</span></p><dl class="desc"><dt>오픈일</dt><dd>${item.open}</dd><dt>사업</dt><dd>${item.business}</dd><dt>디자인</dt><dd>${item.design}</dd><dt>UI</dt><dd>${item.ui}</dd><dt>개발</dt><dd>${item.dev}</dd></dl>`,
					start: item.open,
					end: item.open,
					color: getters.getGameColor(item.gameName)
				}
				commit('SET_CALENDAR_EVENTS', result)
			}
		})
		commit('SET_LAST_PROJECTS', state.lastProjects)
	},
	goToUserList() {
		router.push({ name: 'userList' })
	},
	goToUserView(context, payload) {
		router.push({ name: 'userView', params: { id: payload } })
	}
}

const getters = {
	projects(state) {
		return state.projects.sort((a, b) => new Date(a.open) - new Date(b.open))
	},
	designList(state) {
		return state.users.filter(user => user.part == 'design')
	},
	uiList(state) {
		return state.users.filter(user => user.part == 'ui')
	},
	devList(state) {
		return state.users.filter(user => user.part == 'dev')
	},
	getUser(state) {
		return (userId) => {
			return state.users.find(user => user.id == userId)
		}
	},
	getToday() {
		let date = new Date()
		let year = date.getFullYear()
		let month = new String(date.getMonth() + 1)
		let day = new String(date.getDate())

		month = (month.length == 1) ? `0${month}` : month
		day = (day.length == 1) ? `0${day}` : day

		return `${year}-${month}-${day}`
	},
	getFullpageCount() {
		return (jobs) => {
			return jobs.filter((job) => {
				return (job.spec.toLowerCase().indexOf('full') != -1 || job.spec.toLowerCase().indexOf('풀') != -1)
			}).length
		}
	},
	getGameColor() {
		return (gameName) => {
			switch (gameName) {
				case '엘소드': return '#f44336'
				case '클로저스': return '#00bcd4'
				case '천애명월도': return '#ff9800'
				case '테라': return '#03a9f4'
				case '아스텔리아/TOS': return '#8bc34a'
				case '서든리그/네코제+공통': return '#607d8b'
				case '커츠펠': return '#f1c40f'
				default: return 'eeeeee'
			}
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
