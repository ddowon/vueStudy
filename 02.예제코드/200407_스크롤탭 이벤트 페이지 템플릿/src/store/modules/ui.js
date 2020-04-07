import helper from '@/utils/helper'

const state = {
	isScrolled: false,
	modal: {
		currentElement: null,
		order: []
	}
}

const mutations = {
	SET_MODAL_OPEN(state, id) {
		state.modal.currentElement = id
		state.modal.order.push(id)
	},
	SET_MODAL_CLOSE(state, id) {
		let idx = state.modal.order.findIndex(item => item === id)
		if (idx > -1) {
			state.modal.order.splice(idx, 1)
		}
		state.modal.currentElement = state.modal.order[state.modal.order.length - 1]
	},
	SET_SCROLL(state, status) {
		state.isScrolled = status
	}
}

const actions = {
	showModal({ commit }, id) {
		commit('SET_MODAL_OPEN', id)
		document.body.classList.add('locked-scroll')
	},
	closeModal({ commit, state }, id) {
		commit('SET_MODAL_CLOSE', id)
		if (!state.modal.order.length) {
			document.body.className = document.body.className.replace('locked-scroll', '')
		}
	},
	enableScroll({ commit }) {
		commit('SET_SCROLL', false)
		helper.removeMultipleEventListener(window, 'scroll wheel DOMMouseScroll mousewheel', helper.preventDefault, { passive: false })
		document.onkeydown = null
	},
	disableScroll({ commit }) {
		commit('SET_SCROLL', true)
		helper.addMultipleEventListener(window, 'scroll wheel DOMMouseScroll mousewheel', helper.preventDefault, { passive: false })
		document.onkeydown = helper.preventDefaultForScrollKeys
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}