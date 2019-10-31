import Vue from 'vue'
import Vuex from 'vuex'
import fn from '../util/helpers'

Vue.use(Vuex)

const state = {
	current: 'all',
	todoList: JSON.parse(localStorage.getItem('todoList')) || [],
	searchedList: [],
	isModalShowing: false
}

const mutations = {
	openModal(state) {
		state.isModalShowing = true
	},
	closeModal(state) {
		state.isModalShowing = false
	},
	addItem(state, payload) {
		var lastId = 0
		if (state.todoList.length) {
			lastId = state.todoList[state.todoList.length - 1].id
		}
		state.todoList.push({ id: lastId + 1, title: payload, done: false })
		localStorage.setItem('todoList', JSON.stringify(state.todoList))
	},
	editItem(state, payload) {
		let itemIdx = fn.findListById(state.todoList, payload.idx)
		state.todoList[itemIdx].title = payload.editItem
		localStorage.setItem('todoList', JSON.stringify(state.todoList))
	},
	toggleItem(state, payload) {
		let itemIdx = fn.findListById(state.todoList, payload)
		state.todoList[itemIdx].done = !state.todoList[itemIdx].done
		localStorage.setItem('todoList', JSON.stringify(state.todoList))
	},
	resetItems(state) {
		state.todoList = []
		localStorage.setItem('todoList', JSON.stringify(state.todoList))
	},
	deleteItem(state, payload) {
		let itemIdx = fn.findListById(state.todoList, payload.idx)
		state.todoList.splice(itemIdx, 1)
		localStorage.setItem('todoList', JSON.stringify(state.todoList))
	},
	filterItem(state, payload) {
		state.current = payload
		state.searchedList = []
	},
	searchList(state, payload) {
		state.searchedList = state.todoList.filter(item => item.title.includes(payload))
	}
}

const actions = {
	addItem({ commit }, payload) {
		commit('addItem', payload.newTitle)
		setTimeout(() => {
			payload.callback()
		}, 100)
	},
	deleteItem({ commit }, payload) {
		commit('deleteItem', payload)
		setTimeout(() => {
			payload.callback()
		}, 100)
	},
	editItem({ commit }, payload) {
		commit('editItem', payload)
		setTimeout(() => {
			payload.callback()
		}, 100)
	}
}

const getters = {
	getTodoList(state) {
		if (state.searchedList.length) {
			return state.searchedList
		} else {
			if (state.current === 'done') {
				return state.todoList.filter(item => item.done)
			} else if (state.current === 'yet') {
				return state.todoList.filter(item => !item.done)
			} else {
				return state.todoList
			}
		}
	},
	getSearchedList(state) {
		return state.searchedList
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
