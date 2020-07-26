<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardList 
				:info="noticeInfo" />
			<BoardListPagination 
				:totalPage="noticeInfo.totalPage"
				:pageRange="noticeInfo.pageRange"
				:currentPage="page"
				@changePaging="chagePage" />

			<div class="button">
				<router-link :to="{ name: 'notice_add' }" class="box-btn">
					<span>글쓰기</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI
import { mapActions } from 'vuex'

import BoardList from '@/components/board/BoardList.vue'
import BoardListPagination from '@/components/board/BoardListPagination.vue'

export default {
	name: 'noticeList',
	components: {
		BoardList, BoardListPagination
	},
	props: [ 'page' ],
	data: () => ({
		noticeInfo: {
			title: '공지사항',
			routeName: 'notice',
			itemPerPage: 5,
			pageRange: 10,
			totalPage: null,
			list: []
		}
	}),
	watch: {
		'$route.params': {
			handler(newVal, oldVal) {
				if (newVal && oldVal) {
					this.fetchList(this.page, this.noticeInfo.itemPerPage)
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.fetchList(this.page, this.noticeInfo.itemPerPage)
	},
	methods: {
		fetchList(pageNum, size = 10) {
			this.axios.get(`${API_URI}/notice?page=${pageNum}&size=${this.noticeInfo.itemPerPage}`)
			.then((res) => {
				if (res.data) {
					// 글 보기 화면에서 글을 읽다 다시 '목록' 버튼을 클릭하면 page 값을 가진 목록으로 이동해야 하는데 현재 query 대신 list의 params로 page와 size값이 들어있어 이동 경로를 찾기 매우 까다로움
					// 2페이지에 있는 게시글을 보고 있을 때, '목록' 버튼을 클릭하면 2페이지가 아닌 메인 화면으로 이동함
					// 글 보기 버튼을 클릭하기 전 어떤 페이지를 거쳐 이동했는지 page 값을 '목록' 버튼이 있는 BoardViewFooter.vue에 전달할 필요가 있음

					// 결국 NoticeList.vue에서 BoardViewFooter.vue까지 내가 보려는 글의 page를 물나르기 해야 함
					// 물나르기를 하지 않으려면? VUEX나 Event Bus를 사용해야 함
					// 그러나... Vue Router를 쓰틑 환경에서는 라우터가 변하면 컴포넌트가 재렌더링 되므로 Event Bus로 값 저장은 불가능
					// 이런 UX 문제로 게시판형 페이지에서는 page, size처럼 글 목록, 글 보기에서 밀결합되는 데이터는 url query에 포함하도록 다음 시간에 수정
					// 지금은 query를 사용하지 않으면(=url을 깔끔하게 보이려면) Vuex를 써야 한다 정도로 넘어가기
					// 만약 vuex도 query도 사용하지 않는다면 라우트 afterEach 네비게이션 가드를 써서 데이터를 물나르는..... 요상한 방식을 사용해야 함(이렇게 하면 절대 X)


					////////////////////////////////////////////////////////////////////////////////
					// 이 아래에 @/store/modules/ui.js changeCurrentPage() action을 호출,
					// this.$store.state.currentPage에 페이지값이 담기도록 코드를 작성하세요.
					// this.$store.state.currentPage는 BoardViewFooter.vue에서 사용합니다.
					////////////////////////////////////////////////////////////////////////////////



					this.noticeInfo.totalPage = res.data.totalPageCount
					this.noticeInfo.list = res.data.itemsList
				}
			}).catch((err) => {
				console.error(`${err.response.status}: ${err.response.data.message}`)
			})
		},
		chagePage(pageNum) {
			this.$router.push({
				name: `${this.noticeInfo.routeName}_list`,
				params: { 'page': pageNum }
			})
		}
	}
}
</script>
