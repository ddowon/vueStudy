<template>
	<div class="button">
		<!--
			// 탭 클릭 시 브라우저 URL을 변경하기 위해 vue-router의 router-link를 적용
			// router-link를 적용하면 changeDivision을 부모로 $emit 처리하지 않아도 됨
			// 마찬가지로 active class도 현재 route에 따라 설정되므로 tabList만 남게 됨
			// ex) TV부문 클릭 -> http://BASE_URL/candidate/tv
			// ex) 영화부문 클릭 -> http://BASE_URL/candidate/movie
			// ex) 연극부문 클릭 -> http://BASE_URL/candidate/play
		-->

		<router-link v-for="item in tabList"
			:key="item.id"
			:to="{ name: tabOptions.routeName, params: { [tabOptions.routeParamsName]: item.id } }"
			:class="[ 'box-btn', item.id ]">
			<span>{{ item.title }}</span>
		</router-link>

		<template v-if="tabOptions.moreLinks">
			<a v-for="link in tabOptions.moreLinks"
			:key="link.href"
			:href="link.href"
			:target="link.target"
			class="box-btn more-btn">
				<span>{{ link.title }}</span>
				<em class="ico-more"></em>
			</a>
		</template>
	</div>
</template>
<script>
export default {
	props: {
		tabOptions: { type: Object },
		tabList: { type: Array }
	}
}
</script>