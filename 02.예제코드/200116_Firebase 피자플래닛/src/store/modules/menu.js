import { firebaseAction } from 'vuexfire'

const state = {
	menuItems: []
}

const mutations = {

}

const actions = {
	setMenuRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
		bindFirebaseRef('menuItems', ref)
	})
}

const getters = {
	getMenuItems: state => state.menuItems
}

export default {
	state,
	mutations,
	getters,
	actions
}