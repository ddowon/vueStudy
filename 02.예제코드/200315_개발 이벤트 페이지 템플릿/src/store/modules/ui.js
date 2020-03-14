const state = {
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
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}