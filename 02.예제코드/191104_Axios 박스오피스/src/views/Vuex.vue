<template>
	<div class="vuex">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<AppSubNav :menuIdx="2" />
		<el-divider></el-divider>
		<router-view></router-view>
	</div>
</template>

<script>
import AppSubNav from '@/components/AppSubNav.vue'

export default {
	components: {
		AppSubNav
	},
	props: ['pageTitle']
}
</script>

<style scoped>
.vuex {color:#fafafa;background-color:#212121}
.vuex >>> ul a {color:#ededed}
.el-divider {background-color:#373737}
</style>