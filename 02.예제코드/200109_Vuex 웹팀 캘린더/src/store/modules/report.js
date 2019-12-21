import lastProjects from '@/store/lastProjects.json'

const state = {
	projects: []
}

const mutations = {
	SET_PROJECTS(state, payload) {
		state.projects = payload
	}
}

const actions = {
	fetchProject({ commit, dispatch }) {
		commit('SET_PROJECTS', lastProjects)
		dispatch('calendar/fetchLastProject', lastProjects, { root: true })
	}
}

const getters = {
	projects(state) {
		return state.projects.sort((a, b) => new Date(a.open) - new Date(b.open))
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
