<template>
	<section class="boxOfficeMovieSection">
	 	<h2 class="section-title">박스오피스</h2>
		<input
			placeholder="검색어를 입력하세요"
			v-model="searchKeyword"
			@keyup.enter="fetchItems">
		<template v-if="isLoading">
			<p>로딩중입니다.</p>
		</template>
		<template v-else-if="searchedList.length && pagedList.length">
		<BoxOfficeListItem :list="pagedList"/>
		<el-pagination
		background
		layout="prev, pager, next"
		:total="pageOptions.total"
		:page-size="pageOptions.itemPerPage"
		:current-page="pageOptions.currentPage"
		@current-change="changeCurrentPage">
		</el-pagination>
		</template>
	</section>
</template>

<script>
import { format } from '@/utils/mixin'
import BoxOfficeListItem from '@/components/BoxOfficeListItem.vue'

export default {
	components: { BoxOfficeListItem },
	mixins: [ format ],
	data: () => ({
		isLoading: false,
		searchKeyword: '',
		searchedList: [],
		pageOptions: {
			itemPerPage: 5,
			total: 0,
			currentPage: 1
		}
	}),
	computed: {
		startNum() {
			return (this.pageOptions.currentPage - 1) * this.pageOptions.itemPerPage
		},
		endNum() {
			return this.pageOptions.currentPage * this.pageOptions.itemPerPage
		},
		pagedList() {
			return this.searchedList.slice(this.startNum, this.endNum)
		}
	},
	created() {

	},
	methods: {
		resetItems() {
			this.isLoading = false
			this.searchedList = []
			this.searchKeyword = ''
		},
		changeCurrentPage(pageNum) {
			this.pageOptions.currentPage = pageNum
		},
		fetchItems() {
			const KOBIS_API_KEY = '3549202564fc55c0fb1f6709f54aaeaf'
			const NAVER_API_CLIENT_ID = 'en2dK9JlGCsq365jNFUX'
			const NAVER_API_CLIENT_SECRET = 'Ahjy1Yy7Zx'

			let promises = []

			this.isLoading = true
			this.axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${KOBIS_API_KEY}&movieNm=${this.searchKeyword}`)
			.then((res) => {
				// console.log(res)
			//서버로부터 정상적으로 응답이 왔을 때 실행

				if (res.data.movieListResult.movieList.length) {
					
					this.searchedList = res.data.movieListResult.movieList
					this.pageOptions.total = this.searchedList.length
					this.searchedList.map((movie) => {
						promises.push(
							this.axios.get(`/api/v1/search/movie.json?query=${encodeURI(movie.movieNm)}&yearfrom=${movie.prdtYear}&yearto=${movie.prdtYear}&display=1&start=1`, {
								headers: {
									'X-Naver-Client-Id': NAVER_API_CLIENT_ID,
									'X-Naver-Client-Secret': NAVER_API_CLIENT_SECRET
								}
							})
						)
					})
					this.axios.all(promises)
					.then(this.axios.spread((...args) => {
						args.map((movie, idx) => {
							console.log(movie.data.items[0])
							if(movie.data.items[0]) {
								this.searchedList[idx].imgPath = movie.data.items[0].image || require(`@/assets/default.png`)
								this.searchedList[idx].naverLink = movie.data.items[0].link
								this.searchedList[idx].director = movie.data.items[0].director
								this.searchedList[idx].actor = movie.data.items[0].actor
								this.searchedList[idx].userRating = movie.data.items[0].userRating
							} else {
								this.searchedList[idx].imgPath = require(`@/assets/default.png`)
								this.searchedList[idx].naverLink = 'https://movie.naver.com/'
								this.searchedList[idx].director = ''
								this.searchedList[idx].actor = ''
								this.searchedList[idx].userRating = 0
							}
						})
						this.isLoading = false
					}))
				} else {
					this.$message.error({
						message: '데이터가 없습니다',
						duration: 1000
					})
					this.resetItems()
				}
			})
			.catch((err) => {
			// 서버로부터 응답이 정상적으로 처리되지 못했을 때 실행
			
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.boxOfficeMovieSection {
	padding: 40px;
	.section-title {
		font-size: 1.5rem;
		padding: 0 0 1.25rem;
		line-height: 1.5rem;
		display: inline-block;
		white-space: normal;
		p.lead {
			display: inline;
			padding-left: .625rem;
			font-size: .8125rem;
			vertical-align: middle;
			color: #6e6e6e
		}
	}
}
.movie-item {
	position: relative;
	display: block;
	transition: transform .3s;
	&:hover {
		-webkit-transform: translateY(-6px);
		transform: translateY(-6px)
	}
}
.movie-item__image {
	position: relative;
	display: block;
	overflow: hidden;
	background-color: #000;
	border-radius: .25rem;
	transition: box-shadow .4s;
	&:before {
		content: '';
		padding-top: 244px;
		float: left
	}
	&:after {
		content: '';
		display: block;
		clear: both
	}
	img.image-cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		-o-object-fit: cover;
		object-fit: cover;
		font-family: "object-fit: cover;";
		border: 0;
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 3px;
			z-index: 1;
			background-color: #000;
		}
	}
}
.movie-item__info {
	padding: 1rem 0 0 .1875rem
}
.movie-item__info-title {
	width: auto;
	position: relative;
	display: block;
	color: #ededed;
	line-height: 140%;
	font-size: 15px
}
.movie-item__info-subtitle {
	width: 100%;
	color: #6e6e6e;
	line-height: 1rem;
	margin-top: 3px;
	line-height: 120%;
	font-size: .8rem
}
.movie-item__info-title,
.movie-item__info-subtitle {
	overflow: hidden;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.movie-item__info-action {
	display: inline-block;
	margin: .625rem 0 0;
	padding: 0 1em;
	font-size: .8125rem;
	line-height: 2rem;
	color: #888;
	background-color: #303030;
	border-radius: 6.25rem
}
.movie-item__image-rank {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 2.375rem;
	height: 2.375rem;
	text-align: center;
	line-height: 2.375rem;
	font-size: 1.125rem;
	font-weight: 700;
	border-top-left-radius: .25rem;
	border-bottom-right-radius: .25rem;
	color:#ededed;
	background-color: rgba(104,68,230,.9);
	&.top {
		background-color: #f44336;
	}
}
</style>
