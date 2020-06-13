<template>
	<div class="nominee-title-wrap sub-title">
		<div class="container-inner">
			<h2>56회 후보자 · 작품</h2>
			<div class="button">
				<a href="#" v-for="item in tabList"
				:key="item.division"
				:class="[ 'box-btn', item.division, { 'on': item.division === currentDivision } ]"
				@click.prevent="changeDivision(item.division)">
					<span>{{ item.title }}</span>
				</a>
			</div>
		</div><!-- .container-inner -->
	</div><!-- .nominee-title-wrap -->
</template>

<script>
	export default {
		props: [ 'tabList', 'currentDivision' ],
		methods: {
			changeDivision(division) {
				this.$emit('changeDivision', division)
			}
		}
	}
</script>