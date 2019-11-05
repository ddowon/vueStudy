<template>
	<div>
		<el-button type="primary" :class="{ active: showType === 'all' }" @click="switchCurrent('all')">전체</el-button>
		<el-button type="primary" :class="{ active: showType === 'yet' }" @click="switchCurrent('yet')">미완료</el-button>
		<el-button type="primary" :class="{ active: showType === 'clear' }" @click="switchCurrent('clear')">완료</el-button>
	</div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'


export default {
	data: () => ({

	}),
	computed: {
		...mapState([ 'plans', 'showType'])
	},
	methods: {
		...mapMutations(['switchCurrent'])
	}
}
</script>

<style scoped>
  .list_wrap li > div { display: inline }
  .list_wrap .done { color: #ccc; text-decoration: line-through}
</style>
