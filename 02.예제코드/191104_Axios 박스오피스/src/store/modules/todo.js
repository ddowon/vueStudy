import { findListById, fetchLocalStorage, saveLocalStorage } from '@/utils/helper'

const keyName = 'todoList'

const state = {
	current: 'all',
	isEditing: false,
	todoList: fetchLocalStorage(keyName) || [],
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
		let lastId = (state.todoList.length) ? state.todoList[state.todoList.length - 1].id : 0
		const newTodoObj = { id: lastId + 1, title: payload, done: false }
		state.todoList.push(newTodoObj)
		saveLocalStorage(keyName, state.todoList)
	},
	removeItem(state, payload) {
		let idx = findListById(state.todoList, payload)
		state.todoList.splice(idx, 1)
		saveLocalStorage(keyName, state.todoList)
	},
	editItem(state, payload) {
		let idx = findListById(state.todoList, payload.id)
		state.todoList[idx].title = payload.newTitle
		saveLocalStorage(keyName, state.todoList)
	},
	toggleItem(state) {
		saveLocalStorage(keyName, state.todoList)
	},
	clearItem(state) {
		state.todoList = []
		saveLocalStorage(keyName, state.todoList)
	},
	filterItem(state, payload) {
		state.current = payload
		state.searchedList = []
	},
	searchItemByTitle(state, payload) {
		state.searchedList = state.todoList.filter(item => item.title.includes(payload))
	}
}

const actions = {
	addItem({ commit }, payload) {
		return new Promise((resolve, reject) => {
			if (payload) {
				commit('addItem', payload)
				resolve('추가 완료!')
			} else {
				reject('에러가 발생했습니다.')
			}
		})
	},
	removeItem({ commit }, payload) {
		return new Promise((resolve, reject) => {
			if (payload) {
				commit('removeItem', payload)
				resolve('삭제 완료!')
			} else {
				reject('에러가 발생했습니다.')
			}
		})
	},
	editItem({ commit }, payload) {
		return new Promise((resolve, reject) => {
			if (payload) {
				commit('editItem', payload)
				resolve('수정 완료!')
			} else {
				reject('에러가 발생했습니다.')
			}
		})
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
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
