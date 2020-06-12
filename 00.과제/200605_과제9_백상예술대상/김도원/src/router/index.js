import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Candidate from '@/views/Candidate.vue'

Vue.use(VueRouter)

// export default new VueRouter({	
// 	routes: [
// 		{ path: '/', name: 'home', meta: { title: '메인' }, component: Home },
// 		{ path: '/candidate', meta: { title: '56회 후보자/작품' }, component: Candidate }
// 	]
// })



const routes = [
	{
		path: '/',
		name: 'home',
		meta: { title: '메인' },
		component: Home
	},
	{
		path: '/candidate',
		meta: { title: '56회 후보자/작품' },
		component: Candidate
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router