<template>
	<div v-if="hasNextPage" class="list-more">
		<a href="#" class="box-btn" @click.prevent="getMoreItem()">
			<span>더보기</span>
			<em class="ico-more"></em>
		</a>
	</div>
</template>

<script>
export default {
	name: 'more_item',
	props: [ 'hasNextPage' ],
	methods: {
		getMoreItem() {
			if (!this.hasNextPage) {
				alert('마지막 페이지 입니다.')
				return
			}
			this.$emit('getMoreItem')
		}
	}
}
</script>