<template>
	<div id="nav">
		<el-menu
			:router="true"
			:default-active="activeLink"
			mode="horizontal"
			background-color="#073862"
			text-color="#ffffff"
			active-text-color="#b5dc11">
			<template v-for="rule in $router.options.routes">
				<template v-if="rule.meta.useMenu != false">
					<el-submenu v-if="rule.children && rule.children.length > 0" :index="rule.path" :key="rule.name">
						<template slot="title">{{ rule.meta.title }}</template>
						<el-menu-item v-if="child.meta.useMenu != false" v-for="child in rule.children" :index="rule.path + '/' + child.path" :key="child.meta.title">{{ child.meta.title }}</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :index="rule.path" :key="rule.name">{{ rule.meta.title }}</el-menu-item>
				</template>
			</template>
		</el-menu>
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
		$route(to, from) {
			this.activeLink = to.path
		}
	}
}
</script>