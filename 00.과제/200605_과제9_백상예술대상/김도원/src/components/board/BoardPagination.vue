<template>
	<paginate
		:page-count="Number(totalPage)"
		:page-range="Number(pageRange)"
		:click-handler="clickCallback"
		:prev-text="'first page'"
		:next-text="'last page'"
		:container-class="'paging'"
		:page-class="'curpage'"
		:prev-link-class="'btn-paging-prev'"
		:next-link-class="'btn-paging-next'"
		>
	</paginate>
</template>

<script>

import Paginate from 'vuejs-paginate'

export default {
	components: {
		Paginate, 
	},
	props: [ 'totalPage', 'pageRange' ],
	data: () => ({
		currentPage: ''
	}),
	watch: {
	},
	created() {
	},
	methods: {
		clickCallback(pageNum) {
			this.currentPage = pageNum
			this.$emit('changePaging', pageNum)
		}
	}
}
</script>