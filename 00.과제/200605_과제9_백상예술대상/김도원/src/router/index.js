import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Candidate from '@/views/Candidate.vue'
import Replay from '@/views/Replay.vue'
import Winners from '@/views/Winners.vue'
import Vote from '@/views/Vote.vue'
import Notice from '@/views/Notice.vue'

Vue.use(VueRouter)

// export default new VueRouter({	
// 	routes: [
// 		{ path: '/', name: 'Home', meta: { title: '메인' }, component: Home },
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
		path: '/about',
		name: 'about',
		meta: { title: '시상식 소개' },
		component: About
	},
	{
		path: '/candidate',
		name: 'candidate',
		meta: { title: '56회 후보자/작품' },
		component: Candidate
	},
	{
		path: '/candidate/:division',
		name: 'candidate',
		meta: { title: '56회 후보자/작품' },
		component: Candidate
	},
	{
		path: '/candidate/:division/:prize_id',
		name: 'candidate',
		meta: { title: '56회 후보자/작품'},
		component: Candidate
	},
	{
		path: '/replay',
		name: 'replay',
		meta: { title: '다시보기' },
		component: Replay
	},
	{
		path: '/winners',
		name: 'winners',
		meta: { title: '역대 수상' },
		component: Winners
	},
	{
		path: '/vote',
		name: 'vote',
		meta: { title: '투표하기' },
		component: Vote
	},
	{
		path: '/notice',
		name: 'notice',
		meta: { title: '공지사항' },
		component: Notice
	},
	{
		// 페이지가 없을 경우 메인 화면으로 이동하도록
		path: '*',
		redirect: '/'
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'on',
	routes
})

export default router