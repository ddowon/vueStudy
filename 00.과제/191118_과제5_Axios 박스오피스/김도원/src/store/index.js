import Vue from 'vue'
import Vuex from 'vuex'
import boxOffice from './modules/boxOffice'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		boxOffice
	}
})