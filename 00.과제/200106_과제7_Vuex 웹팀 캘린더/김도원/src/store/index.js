import Vue from 'vue'
import Vuex from 'vuex'
import calendar from './modules/calendar'
import report from './modules/report'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		calendar,
		report
	}
})
