<template>
	<div class="homework">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<HomeworkView/>
	</div>
</template>

<script>
// <router-view>에 주입할 컴포넌트에서 서브 컴포넌트를 불러올 때는
// import를 사용한 후, export default 안 components 배열에 서브 컴포넌트를 명시합니다.
import HomeworkView from '@/components/HomeworkView.vue'

export default {
	props: ['pageTitle'],
	components: {
		HomeworkView
	}
}
</script>

<style scoped>
</style>