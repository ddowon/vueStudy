<template>
	<div class="nominee-title-wrap sub-title">
		<div class="container-inner">
			<h2>56회 후보자 · 작품</h2>
			<div class="button">
				<a href="#" v-for="(item, index) in tabList"
				:key="item.id"
				:id="`division_${item.id}`"
				:class="['box-btn', item.id, {'on': index === currentDivisionIdx}]"
				@click.prevent="changeDivision(index, item.id)">
					<span>{{item.title}}</span>
				</a>
			</div>
		</div><!-- .container-inner -->
	</div><!-- .nominee-title-wrap -->
</template>

<script>
	export default {
		name: '',
		props: ['tabList', 'currentDivisionIdx'],
		data: () => ({
			
		}),
		methods: {
			changeDivision(idx, itemId) {
				this.$emit('changeDivision', idx, itemId)
			}
		}
	}

</script>

