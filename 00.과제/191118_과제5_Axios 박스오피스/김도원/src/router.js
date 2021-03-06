import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import VuexBoxOffice from '@/views/vuex/BoxOffice.vue'
import VuexSearchMovie from '@/views/vuex/SearchMovie.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import * as firebase from 'firebase/app'

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
	routes:[
		{ path: '/', name: 'home', meta: { title: '첫 화면' }, component: Home },
		{ path: '/boxoffice', name: 'vuexBoxOffice', meta: { title: 'Vuex 박스오피스' }, component: VuexBoxOffice },
		{ path: '/search', name: 'VuexSearchMovie', meta: { title: '영화 검색', required: true }, component: VuexSearchMovie },
		{ path: '/login', name: 'login', meta: { title: '로그인', useMenu: false }, component: Login },
		{ path: '/404', name: 'notFound', meta: { title: '페이지를 찾을 수 없습니다.', useMenu: false }, component: NotFound }
	]
})

router.beforeEach((to, from, next) => {
	console.log(`전역 가드 beforeEach 작동!`)
	let isRequired = to.matched.some((route) => {
		return route.meta.required
	})
	if (isRequired) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				next()
			} else {
				alert(`로그인이 필요한 페이지입니다.\n로그인 해 주세요!`)
				next('/login')
			}
		})
	} else {
		next()
	}
})

export default router