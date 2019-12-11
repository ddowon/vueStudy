import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import ProjectView from '@/views/ProjectView.vue'
import TeamView from '@/views/TeamView.vue'
import UserViewList from '@/components/UserViewList.vue'
import NotFound from '@/views/NotFound.vue'

Vue.config.productionTip = false

Vue.use(Router)


const router = new Router({
	mode: 'history',
	routes:[
		{path: '/', name: 'home', meta: {title: '첫 화면'}, component: Home},
		{path: '/project', name: 'projectView', meta: {title: '전체 프로젝트'}, component: ProjectView },
		{ path: '/team', meta: { title: '개별 프로젝트' }, component: TeamView,
			children: [
				{ path: ':id', name: 'userViewList', meta: { title: '개별 프로젝트 보기', useMenu: false }, component: UserViewList, props: true },
			]
		},
		{path: '/404', name: 'notFound', meta: {title: '페이지를 찾을 수 없습니다.', useMenu: false }, component: NotFound}
	]
})

export default router