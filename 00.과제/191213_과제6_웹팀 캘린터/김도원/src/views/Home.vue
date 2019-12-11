<template>
	<div class="home">
		<h1>{{ pageTitle }}</h1>
	</div>
</template>

<script>
export default {
	props: ['pageTitle'],
	beforeRouteLeave: (to, from, next) => {
		console.log("1")
		next()
	},
	beforeRouteUpdate: (to, from, next) => {
		console.log("2")
		next()
	},
	beforeRouteEnter: (to, from, next) => {
		console.log("3")
		next()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
