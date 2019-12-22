import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'
import * as firebase from 'firebase/app'
import Home from './components/Home.vue'
import Menu from './components/Menu.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import Delivery from './components/Delivery.vue'
import History from './components/History.vue'
import OrderingGuide from './components/OrderingGuide.vue'
import Admin from './components/Admin.vue'
import Login from './components/Login.vue'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash
			}
		}
	},
	routes: [
		{
			path: '/',
			name: 'homeLink',
			components: {
				default: Home,
				"ordering-guide": OrderingGuide,
				"delivery": Delivery,
				"history": History
			}
		},
		{
			path: '/menu',
			name: 'menuLink',
			component: Menu
		},
		{
			path: '/admin',
			name: 'adminLink',
			component: Admin,
			meta: { requireAuth: true }
		},
		{
			path: '/login',
			name: 'loginLink',
			component: Login
		},
		{
			path: '/about',
			name: 'aboutLink',
			component: About,
			children: [
				{
					path: '/contact',
					name: 'contactLink',
					component: Contact
				},
				{
					path: '/history',
					name: 'historyLink',
					component: History
				},
				{
					path: '/delivery',
					name: 'deliveryLink',
					component: Delivery
				},
				{
					path: '/ordering-guide',
					name: 'orderingGuideLink',
					component: OrderingGuide
				}
			]
		},
		{
			path: '*',
			redirect: '/'
		}
	]
})

router.beforeEach((to, from, next) => {
	let isRequireAuth = to.matched.some((route) => {
		return route.meta.requireAuth
	})
	if (isRequireAuth) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				Store.dispatch('setUser', user)
				next()
			} else {
				alert(`관리자만 접근 가능한 페이지입니다.\n로그인 해 주세요!`)
				next({ path: '/login' })
			}
		})
	} else {
		next()
	}
})

export default router