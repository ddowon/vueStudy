<template>
	<div class="nominee-title-wrap sub-title">
		<div class="container-inner">
			<h2>56회 후보자 · 작품</h2>
			<div class="button">
				<!--
				<a href="#" v-for="item in tabList"
					:key="item.division"
					:class="[ 'box-btn', item.division, { 'on': item.division === currentDivision } ]"
					@click.prevent="changeDivision(item.division)">
					<span>{{ item.title }}</span>
				</a>
				-->

				<!--
					// 탭 클릭 시 브라우저 URL을 변경하기 위해 vue-router의 router-link를 적용
					// router-link를 적용하면 changeDivision을 부모로 $emit 처리하지 않아도 됨
					// 마찬가지로 active class도 현재 route에 따라 설정되므로 tabList만 남게 됨
					// ex) TV부문 클릭 -> http://BASE_URL/candidate/tv
					// ex) 영화부문 클릭 -> http://BASE_URL/candidate/movie
					// ex) 연극부문 클릭 -> http://BASE_URL/candidate/play
				-->
				<router-link v-for="item in tabList"
					:key="item.division"
					:to="{ name: 'candidate_division', params: { division: item.division } }"
					:class="[ 'box-btn', item.division ]">
					<span>{{ item.title }}</span>
				</router-link>
			</div>
		</div><!-- .container-inner -->
	</div><!-- .nominee-title-wrap -->
</template>

<script>
	export default {
		props: [ 'tabList' ]
	}
</script>