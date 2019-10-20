import Vue from 'vue'
import Vuex from 'vuex'

import example from './modules/example'
import monster from './modules/monster'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		example,
		monster
	}
})
