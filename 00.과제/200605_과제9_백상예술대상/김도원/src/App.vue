<template>
	<div id="app" class="container-wrap" :class="classObject">
		<Header />
		<router-view />
		<Footer />
		<SignIn />
		<SignUp />
	</div>
</template>
<script>
	import Header from '@/components/common/Header.vue'
	import Footer from '@/components/common/Footer.vue'
	import SignIn from '@/components/common/SignIn.vue'
	import SignUp from '@/components/common/SignUp.vue'

	export default {
		name: 'app',
		components: {
			Header, Footer, SignIn, SignUp
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
