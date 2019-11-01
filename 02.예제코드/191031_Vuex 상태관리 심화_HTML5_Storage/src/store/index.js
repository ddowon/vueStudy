import Vue from 'vue'
import Vuex from 'vuex'

import example from './modules/example'
import monster from './modules/monster'
import todo from './modules/todo'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		example,
		monster,
		todo
	}
})
