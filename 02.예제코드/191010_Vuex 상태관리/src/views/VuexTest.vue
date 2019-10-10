<template>
	<div class="home">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<p>{{ count }}번 클릭했습니다.</p>
		<p>현재 클릭 횟수는 {{ numType }}입니다.</p>
		<button @click="increment">증가</button>
		<button @click="decrement">감소</button>
		<button @click="incrementAsync">1초 후 count 증가시키기</button>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	props: ['pageTitle'],
	data: () => ({
		// count: 0
	}),
	computed: {
		// numType() {
		// 	return this.count % 2 === 0 ? '짝수' : '홀수'
		// },
		...mapState([
			'count'
		]),
		...mapGetters([
			'numType'
		])
		// depletedProducts() {
		// 	return this.$store.getters.depletedProducts
		// },
		// count() {
		// 	return this.$store.state.count
		// }
	},
	// computed: mapState({
	// 	count: state => state.count,
	// 	loggedInUser: state => state.loggedInUser
	// }),

	methods: {
		// increment() {
		// 	this.count++
		// },
		// decrement() {
		// 	if (this.count > 0) {
		// 		this.count--
		// 	}
		// },
		// incrementAsync() {
		// 	setTimeout(() => {
		// 		this.increment()
		// 	}, 1000)
		// },
		...mapActions([
			'increment',
			'decrement',
			'incrementAsync'
		])
	},
	created() {
		console.log(this.$store)
	}
}
</script>
<style scoped>
	button {margin:10px 10px 0 0;padding:5px 10px;cursor:pointer}
</style>