<template>
	<!-- src/router.js의 children 배열을 바탕으로 서브 메뉴를 만들어 보세요. -->
	<!--
		v-for, router-link를 활용해 보세요.
		<li><a href="rootURL/monster/">몬스터 리스트</a></li>
		<li><a href="rootURL/monster/add">몬스터 추가하기</a></li>
	-->
	<ul>
		<li><a href="rootURL/monster/">몬스터 리스트</a></li>
		<li><a href="rootURL/monster/add">몬스터 추가하기</a></li>
	</ul>
</template>

<script>
export default {
	name: 'AppSubNav',
	props: ['menuIdx']
}
</script>

<style scoped>
	.router-link-exact-active {color:red;font-weight:bold}
</style>
