<template>
	<!-- src/router.js의 children 배열을 바탕으로 서브 메뉴를 만들어 보세요. -->
	<!--
		v-for, router-link를 활용해 보세요.
		<li><a href="rootURL/monster/">몬스터 리스트</a></li>
		<li><a href="rootURL/monster/add">몬스터 추가하기</a></li>
	-->
<!--	<el-menu :router="true" :default-active="activeLink">
		<template v-for="rule in $router.options.routes">
			<el-submenu v-if="rule.children && rule.children.length > 0" :index="rule.path">
				<el-menu-item v-if="child.meta.useMenu != false" v-for="child in rule.children" :index="rule.path + '/' + child.path" :key="child.meta.title">{{ child.meta.title }}</el-menu-item>
			</el-submenu>
		</template>
	</el-menu>	
-->

	<div :router="true" :default-active="activeLink">
		<div v-for="rule in $router.options.routes">
			<div v-if="rule.children && rule.children.length > 0" :index="rule.path">
				<a v-if="child.meta.useMenu != false" v-for="child in rule.children" :href=" '#' + rule.path + '/' + child.path" :key="child.meta.title">{{ child.meta.title }}</a>
			</div>
		</div>
	</div>	
	
</template>

<script>
export default {
	name: 'AppSubNav',
	props: ['menuIdx'],
	data: () => ({
		activeLink: null
	}),
	mounted () {
		this.activeLink = this.$route.path
	},
	watch: {
		$route (to, from) {
			this.activeLink = to.path
		}
	}
}
</script>

<style scoped>
	.router-link-exact-active {color:red;font-weight:bold}
</style>
