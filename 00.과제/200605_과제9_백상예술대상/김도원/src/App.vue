<template>
	<div id="app" class="container-wrap" :class="classObject">
		<Header />
		<router-view />
		<Footer />
	</div>
</template>
<script>
	import Header from '@/components/common/Header.vue'
	import Footer from '@/components/common/Footer.vue'
	export default {
		name: 'app',
		components: {
			Header, Footer
		},
		computed: {
			classObject() {
				return {
					'main-page': this.$route.name === 'home',
					'sub-page': this.$route.name !== 'home'
				}
			}
		}
	}
</script>
