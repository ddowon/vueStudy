import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Candidate from '@/views/Candidate.vue'
import Replay from '@/views/Replay.vue'
import Winner from '@/views/Winner.vue'
import Vote from '@/views/Vote.vue'
import Notice from '@/views/Notice.vue'

Vue.use(VueRouter)

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
		// /candidate로 접근하면 candidate/tv로 redirect 처리
		redirect: { name: 'candidate_division', params: { division: 'tv' } }
	},
	{
		path: '/candidate/:division',
		name: 'candidate_division',
		meta: { title: '56회 후보자/작품' },
		props: true,
		component: Candidate
	},
	{
		path: '/candidate/:division/:prize_id',
		name: 'candidate_division_prize_id',
		meta: { title: '56회 후보자/작품' },
		props: true,
		component: Candidate
	},
	{
		path: '/replay',
		name: 'replay',
		meta: { title: '다시보기' },
		// replay로 접근하면 replay/56로 redirect 처리
		redirect: { name: 'replay_times', params: { replay_times: '56' } }
	},
	{
		path: '/replay/:replay_times',
		name: 'replay_times',
		meta: { title: '다시보기' },
		component: Replay,
	},
	{
		path: '/winner',
		name: 'winner',
		meta: { title: '역대 수상' },
		// /winner로 접근하면 winner/55로 redirect 처리
		redirect: { name: 'winner_times', params: { times: '55' } }
	},
	{
		path: '/winner/:times',
		name: 'winner_times',
		meta: { title: '역대 수상' },
		props: true,
		component: Winner
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