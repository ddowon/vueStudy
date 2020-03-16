import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/styles/style.css'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
	render: h => h(App),
}).$mount('#app')
