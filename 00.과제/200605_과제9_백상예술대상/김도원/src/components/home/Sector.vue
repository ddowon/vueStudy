<template>
	<div class="sector-wrap ani-visible">
		<div class="container-inner">
			<h2>제56회 백상예술대상 <strong>후보자 · 작품</strong></h2>
			<!-- 메인 화면의 중복되는 마크업을 PageTab 컴포넌트를 재사용하여 수정 -->
			<PageTab
				:tabOptions="tabOptions"
				:tabList="tabList" />
		</div><!-- .container-inner -->
	</div><!-- .sector-wrap -->
</template>

<script>
import PageTab from '@/components/BtnPageTab.vue'

export default {
	name: 'sector',
	components: {
		PageTab
	},
	data: () => ({
		tabList: [
			{ title: 'TV부문', id: 'tv' },
			{ title: '영화부문', id: 'movie' },
			{ title: '연극부문', id: 'play' }
		],
		tabOptions: {
			routeName: 'candidate_division',
			routeParamsName: 'division'
		}
	})
}
</script>
