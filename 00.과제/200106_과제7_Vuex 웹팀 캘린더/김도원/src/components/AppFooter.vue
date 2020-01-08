<template>
	<footer>
		<p class="copy">&copy; {{ new Date().getFullYear() }} Haneul Cho <a href="mailto:haneulcho@nexon.co.kr">haneulcho@nexon.co.kr</a></p>
	</footer>
</template>

<script>
export default {
	name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
	footer {width:100%;min-width:640px;max-width:1280px;margin:0 auto;padding:32px 20px 20px}
	.copy {font-size:0.8rem;color:#8898aa}
	.copy a {margin-left:10px;color:#5e72e4}
	.copy a:hover, .copy a:active {color:#233dd2}
</style>
