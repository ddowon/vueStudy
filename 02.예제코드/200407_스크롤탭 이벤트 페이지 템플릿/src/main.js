import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/styles/style.scss'

Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App),
}).$mount('#wrap')
