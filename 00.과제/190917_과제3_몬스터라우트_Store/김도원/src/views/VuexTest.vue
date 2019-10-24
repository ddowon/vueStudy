<template>
	<div class="monster">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<CountNum />
		<el-divider></el-divider>
		<router-view></router-view>
	</div>
</template>

<script>
import CountNum from '@/components/CountNum.vue'

export default {
	components: {
		CountNum
	},
	props: ['pageTitle']
}
</script>
