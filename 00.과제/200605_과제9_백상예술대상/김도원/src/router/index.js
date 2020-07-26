import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
import { appLocalStorage } from '@/utils/storage'

Vue.use(VueRouter)

// 새로운 라우트로 이동할 때 스크롤 위치를 최상단으로 초기화
// url에 hash가 있다면 셀렉터로 스크롤 이동
// 뒤로/앞으로 가기라면 저장된 위치로 스크롤 이동
const scrollBehavior = (to, from, savedPosition) => {
	if (savedPosition) {
		return savedPosition
	} else if (to.hash) {
		return { selector: to.hash }
	}
	return { x: 0, y: 0 }
}

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	linkActiveClass: 'on',
	routes,
	scrollBehavior
})

router.beforeEach((to, from, next) => {
	let isRequireAuth = to.matched.some((route) => {
		return route.meta.requireAuth
	})

	// 로그인 유지
	let token = appLocalStorage.getItem('bs_token')
	if (token && !store.getters['auth/isLogged']) {
		store.dispatch('auth/checkAuth', token)
	}

	// 관리자 페이지 접근 시 네비게이션 가드 처리
	if (isRequireAuth) {
		if (!store.getters['auth/isLogged'] || store.getters['auth/currentUser'].role !== 'admin') {
			store.dispatch('ui/toast', { message: '관리자만 접근 가능합니다.' })
			if (!from.name) {
				next({ name: 'home' })
			}
			return
		}
		next()
	} else { 
		next()
	}
})

export default router