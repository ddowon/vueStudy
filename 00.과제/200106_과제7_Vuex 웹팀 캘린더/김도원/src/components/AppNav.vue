<template>
	<nav id="nav">
		<ul>
			<li v-for="rule in filteredRoutes" :key="rule.name">
				<router-link :to="{ name: rule.name }" :class="{ 'router-link-child-active': activeLink.indexOf('team') !== -1 && rule.path.indexOf('team') !== -1 }">
					<span class="desc">{{ rule.meta.desc }}</span>
					<v-icon>{{ rule.meta.icon }}</v-icon>
					{{ rule.meta.title }}
				</router-link>
			</li>
			<li>
				<a href="#" @click.prevent="fetchProject">
					<span class="desc">최근 데이터로 동기화</span>
					<v-icon>cached</v-icon>
					새로고침
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'AppNav',
	data: () => ({
		activeLink: ''
	}),
	computed: {
		filteredRoutes() {
			return this.$router.options.routes.filter((rule) => rule.meta.useMenu !== false)
		}
	},
	mounted() {
		this.activeLink = this.$route.path
	},
	watch: {
		$route(to, from) {
			this.activeLink = to.path
		}
	},
	methods: {
		...mapActions('calendar', [
			'fetchProject'
		])
	}
}
</script>

<style lang="scss" scoped>
	#nav ul {
		margin: 0;
		padding: 0;
		text-align: center;
		li {
			&:first-child {
				margin-left: 0;
			}
			margin-left: 1.8rem;
			display: inline-block;
			word-wrap: break-word;
			a, button {
				display: block;
				font-size: 1.25rem;
				padding: 1rem 1.5rem;
				color: #fff;
				border: 1px solid rgba(255, 255, 255, .7);
				border-radius: .375rem;
				background-color: transparent;
				background-clip: border-box;
				transition: all ease .3s;
				&:hover {
					background-color: rgba(255, 255, 255, .4);
				}
				.desc {
					display: block;
					margin-bottom: 0.25rem;
					font-size:.8125rem;
				}
				.v-icon {
					vertical-align: -0.3rem;
					color: #fff;
				}
				&:hover,
				&.router-link-exact-active,
				&.router-link-child-active {
					color:#32325d;
					border: 1px solid rgba(0, 0, 0, .05);
					border-radius: .375rem;
					background-color: #fff;
				}
				&:hover > .desc,
				&.router-link-exact-active > .desc,
				&.router-link-child-active > .desc {
					color: #8898aa;
				}
				&:hover > .v-icon,
				&.router-link-exact-active > .v-icon,
				&.router-link-child-active > .v-icon {
					color: #47c6e4;
				}
			}
		}
	}
</style>