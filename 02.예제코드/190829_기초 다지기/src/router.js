import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Code from '@/views/Code.vue'
import Monster from '@/views/Monster.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/home', name: 'home', component: Home },
		{ path: '/code', name: 'code', component: Code },
		{ path: '/monster', name: 'monster', component: Monster }
	]
})