<template>
	<div class="paging">
		<el-pagination
			background
			layout="prev, pager, next"
			@current-change="changeCurrentPage"
			:page-size="itemPerPage"
			:total="total">
		</el-pagination>
	</div>
</template>

<script>
export default {
	props: [ 'total', 'itemPerPage' ],
	methods: {
		changeCurrentPage(currentPage) {
			this.$emit('change', currentPage)
		}
	}
}
</script>

<style lang="scss">
.paging {
	margin: 20px auto 0;
	text-align: center;
}
</style>