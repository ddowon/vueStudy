<template>
<section class="boxOfficeMovieSection">
	<h2 class="section-title">박스오피스</h2>
	<el-date-picker
	v-model="targetDt"
	type="date"
	placeholder="Pick a day"
	value-format="yyyyMMdd"
	@change="fetchItems">
	</el-date-picker>
	<template v-if="isLoading">
		<p>로딩중입니다.</p>
	</template>
	<template v-else-if="rankList.length && pagedList.length">
		<slick ref="slick" :options="slickOptions">
			<div class="movie-item" v-for="movie in rankList" :key="movie.movieNm">
				<a class="movie-item__image" :href="movie.naverLink" target="_blank">
					<span class="movie-item__image-rank" :class="{ top: movie.rank < 4 }">{{ movie.rank }}</span>
					<img :src="movie.imgPath" :alt="movie.movieNm" class="image-cover">
				</a>
				<div class="movie-item__info">
					<a :href="movie.NaverLink" class="movie-item__info-title" target="_blank">{{ movie.movieNm }}</a>
					<p class="movie-item__info-subtitle">누적관람객 {{movie.audiAcc | formatNumber }}명</p>
					<a :href="movie.naverLink" class="movie-item__info-action" target="_blank">네이버에서 보기</a>
				</div>
			</div>
		</slick>
		<BoxofficeListItem :list="pagedList"/>
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

import BoxofficeListItem from '@/components/BoxOfficeListItem.vue'
import Slick from 'vue-slick'

export default {
	components: { BoxofficeListItem, Slick },
	mixins: [ format ],
	data: () => ({
		rankList: null,
		isLoading: false,
		today: new Date(),
		targetDt: '',
		slickOptions: {
		slidesToShow: 6,
		slidesToScroll: 6,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 1000,
		infinite: true,
		accessiblity: true,
		adaptiveHeight: false,
		arrows: false,
		dots: true,
		draggable: true,
		edgeFriction: 0.30,
		swipe: true
		},
		pageOptions: {
		itemPerPage: 5,
		total: 0,
		currentPage: 1
		}
	}),
	computed: {
		year() {
			return this.today.getFullYear()
		},
		month(){
			let month = this.today.getMonth() + 1
			return (month < 10) ? `0${month}` : month

		},
		date() {
			let date = this.today.getDate() - 1
			return (date < 10) ? `0${date}` : date
		},
		topRankList() {
			return this.rankList.fliter(item => item.rank < 4)
		},
		targetYear() {
			return this.targetDt.substring(0, 4)
		},
		startNum() {
			return (this.pageOptions.currentPage - 1) * this.pageOptions.itemPerPage
		},
		endNum() {
			return this.pageOptions.currentPage * this.pageOptions.itemPerPage
		},
		pagedList() {
			return this.rankList.slice(this.startNum, this.endNum)
		}
	},
	created() {
		this.targetDt = `${this.year}${this.month}${this.date}`
		this.fetchItems()
	},
	methods: {
		test() {
			console.log(`선택한 날짜 : ${this.targetDt}`)
		},
		resetItems() {
			console.log('없음')

			this.isLoading = false
			this.rankList = []
			this.targetDt = `${this.year}${this.month}${this.date}` 
			this.fetchItems()
		},
		changeCurrentPage(pageNum) {
			console.log(`바뀌나?!${pageNum}`)

			this.pageOptions.currentPage = pageNum

		},
		fetchItems() {


			console.log(`선택한 날짜 : ${this.targetDt}`)

			const KOBIS_API_KEY = '3549202564fc55c0fb1f6709f54aaeaf'
			const NAVER_API_CLIENT_ID = 'en2dK9JlGCsq365jNFUX'
			const NAVER_API_CLIENT_SECRET = 'Ahjy1Yy7Zx'

			let yearfrom = Number(this.targetYear) - 5
			let yearto = Number(this.targetYear) + 1
			let promises = []

			this.isLoading = true
			this.axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KOBIS_API_KEY}&targetDt=${this.targetDt}`)
			.then((res) => {

				console.log(res)
				//서버로부터 정상적으로 응답이 왔을 때 실행

				if (res.data.boxOfficeResult.dailyBoxOfficeList.length) {
				
					this.rankList = res.data.boxOfficeResult.dailyBoxOfficeList
					this.pageOptions.total = this.rankList.length
					this.rankList.map((movie) => {
						promises.push(
						this.axios.get(`/api/v1/search/movie.json?query=${encodeURI(movie.movieNm)}&yearfrom=${yearfrom}&yearto=${yearto}&display=1&start=1`, {
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
							this.rankList[idx].imgPath = movie.data.items[0].image || require(`@/assets/default.png`)
							this.rankList[idx].naverLink = movie.data.items[0].link
							this.rankList[idx].director = movie.data.items[0].director
							this.rankList[idx].actor = movie.data.items[0].actor
							this.rankList[idx].userRating = movie.data.items[0].userRating
						})
						console.log('네이버 영화 이미지 데이터 박스오피스에 삽입 완료')
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
		},
		next() {
			this.$refs.slick.next()
		},
		prev() {
			this.$refs.slick.prev()
		},
		reInit() {
			this.$nextTick(() => {
				this.$refs.slick.reSlick()
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
<style lang="scss">
.slick-slider {
	.slick-slide {
		margin: 0 14px;
	}
	.slick-list {
		margin: 0 -14px;
	}
}
.slick-dots {
	position: relative;
	bottom: 0;
	li {
		margin: 15px 2px 0;
		button:before {
			color: #4c4c4c
		}
		&.slick-active button:before {
			color: #fff
		}
	}
}
</style>
