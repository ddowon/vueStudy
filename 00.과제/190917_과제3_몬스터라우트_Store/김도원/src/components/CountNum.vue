<template>
	<div>
		<p>{{count}}는 {{numType}}입니다.</p>
		<button type="button" @click="increase">증가</button>
		<button type="button" @click="decrease">감소</button>

	</div>
</template>

<script>
export default {
	data: ()=> ({
		count: 0
	}),
	computed: {
		numType(){
			return this.count % 2 == 0 ? '짝수' : '홀수'
		}
	},
	methods: {
		increase() {
			this.count ++ 
		},
		decrease(){
			this.count --
		}
	}
}
</script>

<style scoped>
</style>