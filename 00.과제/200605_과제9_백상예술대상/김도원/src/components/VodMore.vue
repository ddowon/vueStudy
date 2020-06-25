<template>
	<!-- 더보기 -->
	<div class="list-more">
		<a href="#"  class="box-btn" @click.prevent="moreVodList()">
			<span>더보기</span>
			<em class="ico-more"></em>
		</a>
	</div>
</template>

<script>

export default {
	name: 'replay',
	props: [ 'hasNextPage' ],
	data: () => ({
	}),
	computed: {
	},
	mounted() {
	},
	methods: {
		moreVodList() {
			if(!this.hasNextPage){
				alert('마지막 페이지 입니다.')
				return false
			}
			this.$emit('moreVodList')
		}
	}
}
</script>