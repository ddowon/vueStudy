import 'babel-polyfill'
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueYoutube from 'vue-youtube'
import vueMoment from 'vue-moment'
import moment from 'moment'

import '@/styles/ui.css'
import '@/styles/ui2020.css'

Vue.config.productionTip = false

// 날짜 표기 형식을 한글로 수정
moment.locale('ko')

Vue.use(VueAxios, axios)
Vue.use(VueYoutube)
Vue.use(vueMoment, { moment })

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
