<template>
	<div class="notice-page">
		<div class="notice-title-wrap sub-title">
			<div class="container-inner">
				<h2>공지사항</h2>
			</div>
		</div>
		<div class="notice-title sector-title">
			<div class="container-inner">
				<strong>백상예술대상의 새로운 소식을 전해드립니다.</strong>
			</div>
		</div>
		<div class="tlb-wrap">
			<div class="container-inner">
				<BoardList 
					:info="noticeInfo" />
				<BoardPagination 
					:routerName="noticeInfo.routerName" 
					:routerParamsName="noticeInfo.routerParamsName" 
					:totalPage="noticeInfo.totalPage" 
					:pageRange="noticeInfo.pageRange" 
					:currentPage="$route.params.notice_list_page"
					@changePaging="changePaging" />
			</div>
		</div>
	</div>
</template>

<script>
	const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI

	import BoardList from '@/components/board/BoardList.vue'
	import BoardPagination from '@/components/board/BoardPagination.vue'

	export default {
		name: 'notice',
		components: {
			BoardList, BoardPagination
		},
		data: () => ({
			noticeInfo: {
				title: '공지사항',
				routerName: 'notice_list',
				routerParamsName: 'notice_list_page',
				pageRange: 10,
				totalPage: Number,
				list: []
			}
		}),
		watch: {
			'$route.params.notice_list_page': {
				handler(newVal, oldVal) {
					if (newVal && oldVal) {
						this.fetchList(this.$route.params.notice_list_page)
					}
				},
				deep: true,
				immediate: true
			}
		},
		created() {
			this.fetchList(this.$route.params.notice_list_page);
		},

		methods: {
			fetchList(pageNum, size = 5) {
				this.axios.get(`${API_URI}/notice?page=${pageNum}&size=${size}`)
				.then((res) => {
					if (res.data) {
						this.noticeInfo.totalPage = res.data.totalPageCount
						this.noticeInfo.list = res.data.itemsList
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			changePaging(num) {
				this.fetchList(num)
			}
		}
	}
</script>
