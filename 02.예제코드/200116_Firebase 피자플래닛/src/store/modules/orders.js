import { firebaseAction } from 'vuexfire'

const state = {
	orders: []
}

const mutations = {
	addOrder: (state, orders) => state.orders.push(orders)
}

const actions = {
	setOrdersRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
		bindFirebaseRef('orders', ref)
	})
}

const getters = {
	getOrders: state => state.orders,
	numberOfOrders: state => state.orders.length
}

export default {
	state,
	mutations,
	getters,
	actions
}