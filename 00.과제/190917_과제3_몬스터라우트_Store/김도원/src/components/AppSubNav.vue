<template>
	<!-- src/router.js의 children 배열을 바탕으로 서브 메뉴를 만들어 보세요. -->

	<div>
		<ul>
			<li v-for="(rule, index) in $router.options.routes[menuIdx].children" :key="index" v-if=" rule.meta.useMenu != false">
				<router-link :to="{ name: rule.name }">{{rule.meta.title}}</router-link>
			</li>
		</ul>
	</div>
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
