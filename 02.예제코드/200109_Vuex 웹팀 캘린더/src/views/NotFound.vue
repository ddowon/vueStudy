<template>
	<div class="project">
		<h1>페이지를 찾을 수 없습니다.</h1>
		<p>{{ count }}초 후 첫 화면으로 이동합니다.</p>
	</div>
</template>

<script>
export default {
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
