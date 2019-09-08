<template>
	<div class="monster">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<AppSubNav :menuIdx="1" />
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
