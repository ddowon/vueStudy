import lastProjects from '@/store/lastProjects.json'
import axios from 'axios'

const state = {
	projects: [],
	pageOptions: {
		totalCount: 0,
		itemPerPage: 20,
		currentPage: 1
	},
}

const mutations = {
	SET_PROJECTS(state, payload) {
		state.projects = payload
	},
	changeCurrentPage(state, currentPage) {
		state.pageOptions.currentPage = currentPage
	},
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
	},

}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
