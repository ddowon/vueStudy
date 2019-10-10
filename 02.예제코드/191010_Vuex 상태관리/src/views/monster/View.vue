<template>
	<div>
		<h2>몬스터 정보 보기(views/monster/View.vue)입니다.</h2>
		<!-- 몬스터 정보 보기 컴포넌트(@/components/MonsterView.vue)에 $route.params.id 값을 전달합니다. -->
		<MonsterView :id="Number(id)" />
	</div>
</template>

<script>
import MonsterView from '@/components/MonsterView.vue'

export default {
	components: {
		MonsterView
	},
	// @/router.js의 몬스터 정보 보기 라우트 객체에 props 속성을 true로 설정하면 컴포넌트에서 $route.params.id를 직접 작성하는 대신 id를 속성값으로 바인딩할 수 있습니다.
	// { path: 'view/:id(\\d+)', name: 'monsterView', meta: { title: '몬스터 정보 보기', useMenu: false }, component: MonsterView, *** props: true 이 부분 *** },
	props: ['id']
}
</script>
