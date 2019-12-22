<template>
	<div class="row">
		<div id="home" class="col-sm-12 text-center">
			<div class="background">
				<h1>도선생, 어서오세오.<br>Pizza Planet에!</h1>
				<h2>배고프시죠?</h2>
				<button class="btn btn-success" @click="goToMenu">주문하러 가기</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		goToMenu() {
			this.$router.push({ name: 'menuLink' })
		}
	}
}
</script>

<style>
#home {
	background: url('../../src/assets/pizza.jpg');
	height: 800px;
	padding: 10%;
}

h1,
h2 {
	margin: 6%;
}

.background {
	background: #eee;
	opacity: 0.8;
	max-width: 60%;
	margin: 0 auto;
	padding: 20px 0;
}
</style>