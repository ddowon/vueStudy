<template>
	<v-app>
		<AppHeader :title="docTitle"/>
		<v-content>
			<v-container fluid>
				<router-view/>
			</v-container>
		</v-content>
		<AppFooter/>
	</v-app>
</template>

<script>
import style from '@/assets/style.css'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
	components: {
		AppHeader, AppFooter
	},
	data: () => ({
		docTitle: '웹팀 캘린더'
	}),
	mounted() {
		document.title = (this.$route.meta.title) ? `${this.$route.meta.title} :: ${this.docTitle}` : this.docTitle
	},
	watch: {
		$route(to, from) {
			document.title = (to.meta.title) ? `${to.meta.title} :: ${this.docTitle}` : this.docTitle
		}
	}
}
</script>

<style lang="scss" scoped>
	.container {position:relative;width:calc(1280px - 2rem);min-height:400px;margin:-5.6rem auto 0;padding:1.7rem 2.2rem;box-shadow:0 0 2rem 0 rgba(136, 152, 170, .15) !important;border:1px solid rgba(0, 0, 0, .05);border-radius: .375rem;background-color:#fff
	}
</style>