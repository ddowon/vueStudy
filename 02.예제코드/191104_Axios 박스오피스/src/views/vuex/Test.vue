<template>
	<div>
		<p>{{ count }}번 클릭했습니다.</p>
		<p>현재 클릭 횟수는 {{ numType }}입니다.</p>
		<input type="number" v-model.number="num">만큼
		<button @click="add">증가</button>
		<button @click="decrement">감소</button>
		<button @click="incrementAsync">1초 후 count 증가시키기</button>
	</div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
	props: [ 'pageTitle' ],
	data: () => ({
		num: 1
	}),
	computed: {
		...mapState('example', [
			'count'
		]),
		...mapGetters('example', [
			'numType'
		])
	},
	methods: {
		...mapActions('example', [
			'increment',
			'decrement',
			'incrementAsync'
		]),
		add() {
			this.increment(this.num)
		}
	}
}
</script>
<style scoped>
	button {margin:10px 10px 0 0;padding:5px 10px;cursor:pointer}
</style>
