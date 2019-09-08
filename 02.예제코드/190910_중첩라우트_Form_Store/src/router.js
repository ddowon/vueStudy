import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Monster from '@/views/Monster.vue'
import MonsterList from '@/views/monster/List.vue'
import MonsterView from '@/views/monster/View.vue'
import MonsterAdd from '@/views/monster/Add.vue'

Vue.use(Router)

/*
몬스터 홈(=리스트):
기본 URL/monster

몬스터 보기:
기본 URL/monster/view/1 (숫자만 입력 가능)

몬스터 추가하기:
기본 URL/monster/add
*/

export default new Router({
	routes: [
		{ path: '/', name: 'home', meta: { title: '첫 화면' }, component: Home },
		{ path: '/monster', meta: { title: '몬스터' }, component: Monster,
			children: [
				{ path: '', name: 'monster', meta: { title: '몬스터 리스트' }, component: MonsterList },
				{ path: 'view/:id(\\d+)', name: 'monsterView', meta: { title: '몬스터 정보 보기', useMenu: false }, component: MonsterView },
				{ path: 'add', name: 'monsterAdd', meta: { title: '몬스터 추가하기' }, component: MonsterAdd }
			]
		}
	]
})
