import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Monster from '@/views/Monster.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{ path: '/', name: 'home', meta: { title: '첫 화면' }, component: Home },
		{ path: '/monster', name: 'monster', meta: { title: '몬스터 리스트' }, component: Monster }
	]
})