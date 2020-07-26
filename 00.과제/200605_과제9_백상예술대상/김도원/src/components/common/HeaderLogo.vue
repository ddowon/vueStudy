<template>
	<h1 class="logo">
		<router-link :to="{ name: 'home' }">
			<span>제55회 백상예술대상 Baeksang Arts Award</span>
		</router-link>
	</h1>
</template>

<script>
export default {
	name: 'headerLogo'
}
</script>
