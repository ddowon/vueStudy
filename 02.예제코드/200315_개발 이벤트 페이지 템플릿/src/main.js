import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/plugins/exception-handler'
import '@/styles/style.scss'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
	store,
	render: h => h(App),
}).$mount('#wrap')
