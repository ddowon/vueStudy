<template>
	<div class="home">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<p>{{ count }}초 후 첫 화면으로 이동합니다.</p>
	</div>
</template>

<script>
export default {
	props: ['pageTitle'],
	data: () => ({
		count: 3,
		interval: null
	}),
	mounted() {
		setInterval(() => {
			this.count -= 1;
			if (this.count == 0) {
				this.$router.push({ path: '/' })
			}
		}, 1000);
	}
}
</script>
