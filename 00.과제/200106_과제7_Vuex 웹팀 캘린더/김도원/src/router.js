import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'

import Team from '@/views/Team.vue'
import TeamUserList from '@/views/team/List.vue'
import TeamUserView from '@/views/team/View.vue'
import TeamUserReportView from '@/views/team/ReportView.vue'
import TeamReportView from '@/views/team/TeamReportView.vue'


Vue.use(Router)

const router = new Router({
	routes: [
		{ path: '/', name: 'home', meta: { title: '월별 보기', desc: '월별로 활성 프로젝트 조회', icon: 'date_range' }, component: Home },
		{
			path: '/team', name: 'userList', meta: { title: '팀원별 보기', desc: '팀원별로 활성 프로젝트 조회', icon: 'perm_contact_calendar' }, component: Team,
			children: [
				{ path: '', name: 'userList', meta: { title: '팀원별 보기' }, component: TeamUserList },
				{ path: 'report', name: 'teamReportView', meta: { title: '팀전체 보기' }, component: TeamReportView },
				{ path: ':id(\\d+)', name: 'userView', meta: { title: '팀원 프로젝트 보기' }, component: TeamUserView, props: true },
				{ path: ':id(\\d+)/report', name: 'userReportView', meta: { title: '팀원 리포트 보기' }, component: TeamUserReportView, props: true },
			]
		},
		{ path: '/404', name: 'notFound', meta: { title: '페이지를 찾을 수 없습니다.', useMenu: false }, component: NotFound },
		{ path: '*', meta: { title: '페이지를 찾을 수 없습니다.', useMenu: false }, component: NotFound },
	]
})

export default router