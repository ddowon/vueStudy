<template>
	<header>
		<h1><v-icon>dvr</v-icon> {{ title }}</h1>
		<AppNav/>
	</header>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
export default {
	components: { AppNav },
	props: ['title']
}
</script>

<style lang="scss" scoped>
	header {
		padding:70px 10px 120px;background:linear-gradient(87deg, #5e72e4 0, #825ee4 100%) !important
	}
	header h1 {
		margin-bottom:35px;text-align:center;color:#fff;font-size:52px;letter-spacing:-1px;
	}
	.v-icon {color:#fff;margin-right:2px;font-size:2.4rem;vertical-align:-0.2rem}
</style>