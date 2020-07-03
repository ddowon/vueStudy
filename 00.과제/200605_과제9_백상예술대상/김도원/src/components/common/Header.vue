<template>
	<div class="header-wrap">
		<div class="container-inner">
			<HeaderLogo />
			<HeaderNav />
		</div><!-- .container-inner -->
		<HeaderAside />
	</div><!-- .header-wrap -->
</template>

<script>
	import HeaderLogo from '@/components/common/HeaderLogo.vue'
	import HeaderNav from '@/components/common/HeaderNav.vue'
	import HeaderAside from '@/components/common/HeaderAside.vue'
	export default {
		name: 'Header',
		components: {
			HeaderLogo, HeaderNav, HeaderAside
		}
	}
</script>
