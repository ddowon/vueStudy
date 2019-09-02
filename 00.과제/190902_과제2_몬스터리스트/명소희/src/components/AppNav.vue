<template>
	<div id="nav">
		<nav>
			<ul>
				<!--
					src/router.js에 작성한 routes 배열을 v-for 디렉티브를 사용하여 반복 렌더링합니다.
					우리가 가져올 것은 routes 배열 속 각 객체의 path와 meta.title 속성입니다.
					{ path: '/', name: 'home', meta: { title: '첫 화면' }, component: Home },
					{ path: '/monster', name: 'monster', meta: { title: '몬스터 리스트' }, component: Monster }

					<li><router-link to="/">{{ pageTitle }}</router-link></li>
					<li><router-link to="/monster">{{ pageTitle }}</router-link></li>
				-->
				<li v-for="route in $router.options.routes" :key="route.path">
					<router-link :to="route.path">{{ route.meta.title }}</router-link>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'AppNav'
}
</script>

<style scoped>
	.router-link-exact-active {color:red;font-weight:bold}
</style>
