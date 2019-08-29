<template>
	<div id="nav">
		<!-- Element-UI를 사용하지 않고 기본 링크를 생성해 봅시다.
			<el-menu
			:router="true"
			:default-active="activeLink"
			mode="horizontal"
			background-color="#073862"
			text-color="#ffffff"
			active-text-color="#b5dc11">
			<el-menu-item :index="rule.path" v-for="rule in $router.options.routes" :key="rule.meta.title">{{ rule.meta.title }}</el-menu-item>
			</el-menu>
		-->
		<nav>
			<ul>
				<li><router-link to="/">첫 화면</router-link></li>
				<li><router-link to="/code">예제코드 모음</router-link></li>
				<li><router-link to="/monster">몬스터 리스트</router-link></li>

				<li><router-link to="/" tag="button">첫 화면</router-link></li>
				<li><router-link to="/code" tag="button">예제코드 모음</router-link></li>
				<li><router-link to="/monster" tag="button">몬스터 리스트</router-link></li>
			</ul>
		</nav>
	</div>
</template>

<script>
export default {
	name: 'AppNav',
	data: () => ({
		activeLink: null
	}),
	mounted() {
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
