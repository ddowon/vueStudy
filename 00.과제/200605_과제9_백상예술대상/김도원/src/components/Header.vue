<template>
	<div class="header-wrap">
		<div class="container-inner">
			<HeaderLogo/>
			<HeaderNav/>
		</div><!-- .container-inner -->
	</div><!-- .header-wrap -->
</template>

<script>
	import HeaderLogo from '@/components/HeaderLogo.vue'
	import HeaderNav from '@/components/HeaderNav.vue'
	export default {
		name: 'Header',
		components: {
			HeaderLogo, HeaderNav
		},
		props: {
			msg: String
		}
	}

</script>

