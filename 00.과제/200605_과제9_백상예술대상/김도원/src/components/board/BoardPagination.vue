<template>
	<paginate
		:page-count="Number(totalPage)"
		:page-range="Number(pageRange)"
		:click-handler="clickCallback"
		:force-page="Number(currentPage)"
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
	props: [ 'routerName', 'routerParamsName', 'totalPage', 'pageRange', 'currentPage' ],
	data: () => ({
	}),
	watch: {
	},
	created() {
	},
	methods: {
		clickCallback(pageNum) {
			
			// this.$emit('changePaging', pageNum)

			this.$router.push({name: this.routerName, params: { 'notice_list_page': pageNum, size: 5}})
			
		}
	}
}
</script>