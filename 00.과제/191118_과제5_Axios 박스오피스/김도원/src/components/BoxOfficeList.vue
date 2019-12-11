<template>
<section class="boxOfficeMovieSection">
	<h2 class="section-title">박스오피스</h2>
	<template v-if="isLoading">
		<p class="sectoin-msg__loading">{{ targetDate ? targetDate : `${year}-${month}-${date}` }} 데이터를 로딩중입니다.</p>
	</template>
	<template v-else-if="rankList">
		<BoxOfficeDatepicker :date="targetDate ? targetDate : `${year}-${month}-${date}`" @change="changeDate" />
		<slick ref="slick" :options="slickOptions">
			<div class="movie-item" v-for="movie in rankList" :key="movie.movieNm">
				<a class="movie-item__image" :href="movie.naverLink" target="_blank">
					<span class="movie-item__image-rank" :class="{ top: movie.rank < 4 }">{{ movie.rank }}</span>
					<img :src="movie.imgPath" :alt="movie.movieNm" class="image-cover">
				</a>
				<div class="movie-item__info">
					<a :href="movie.naverLink" class="movie-item__info-title" target="_blank">{{ movie.movieNm }}</a>
					<p class="movie-item__info-subtitle">누적 관람객 {{ movie.audiAcc | formatNumber }}명</p>
					<a :href="movie.naverLink" class="movie-item__info-action" target="_blank">네이버에서 보기</a>
				</div>
			</div>
		</slick>
		<BoxOfficeListItem :list="pagedList" />
		<BoxOfficeListPagination :total="pageOptions.totalCount" :item-per-page="pageOptions.itemPerPage" @change="changeCurrentPage" />
	</template>
</section>
</template>

<script>
import { API } from '@/constant'
import { format } from '@/utils/mixin'
import BoxOfficeDatepicker from '@/components/BoxOfficeDatepicker.vue'
import BoxOfficeListItem from '@/components/BoxOfficeListItem.vue'
import BoxOfficeListPagination from '@/components/BoxOfficeListPagination.vue'
import Slick from 'vue-slick'

export default {
	components: {
		BoxOfficeDatepicker,
		BoxOfficeListItem,
		BoxOfficeListPagination,
		Slick
	},
	mixins: [ format ],
	data: () => ({
		rankList: null,
		isLoading: false,
		today: new Date(),
		targetDate: '',
		pageOptions: {
			totalCount: 0,
			itemPerPage: 5,
			currentPage: 1
		},
		slickOptions: {
			slidesToShow: 6,
			slidesToScroll: 6,
			autoplay: true,
			autoplaySpeed: 3000,
			speed: 1000,
			infinite: true,
			accessibility: true,
			adaptiveHeight: false,
			arrows: false,
			dots: true,
			draggable: true,
			edgeFriction: 0.30,
			swipe: true,
		}
	}),
	computed: {
		year() {
			return this.today.getFullYear()
		},
		month() {
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
		changeDate(date) {
			this.targetDate = date
			this.fetchItems()
		},
		changeCurrentPage(currentPage) {
			this.pageOptions.currentPage = currentPage
		},
		resetItems() {
			this.targetDate = ''
			this.rankList = null
			this.$message({
				message: '해당 일자의 데이터가 존재하지 않아 가장 최근 데이터를 다시 불러옵니다.',
				type: 'error',
				offset: 50,
				duration: 2000,
				onClose: this.fetchItems()
			})
		},
		fetchItems() {
			let targetDt = (this.targetDate) ? this.targetDate.replace(/[^0-9]/g, '') : `${this.year}${this.month}${this.date}`
			let promises = []

			this.isLoading = true
			this.axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API.KOBIS_KEY}&targetDt=${targetDt}`)
			.then((res) => {
				// 서버로부터 정상적으로 응답이 왔을 때 실행
				if (res.data.boxOfficeResult.dailyBoxOfficeList.length) {
					this.rankList = res.data.boxOfficeResult.dailyBoxOfficeList
					this.rankList.map((movie) => {
						let yearfrom = (movie.openDt && movie.openDt.trim() != '') ? movie.openDt.substr(0, 4) - 5 : this.year
						let yearto = (movie.openDt && movie.openDt.trim() != '') ? movie.openDt.substr(0, 4) : this.year
						promises.push(
							this.axios.get(`/api/v1/search/movie.json?query=${encodeURI(movie.movieNm)}&yearfrom=${yearfrom}&yearto=${yearto}&display=1&start=1`, {
								headers: {
									'X-Naver-Client-Id': API.NAVER_CLIENT_ID,
									'X-Naver-Client-Secret': API.NAVER_CLIENT_SECRET
								}
							})
						);
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
						this.pageOptions.totalCount = this.rankList.length
						this.isLoading = false
					}))
				} else {
					this.resetItems()
				}
			})
			.catch((err) => {
				// 서버로부터 응답이 정상적으로 처리되지 못했을 때 실행
				this.resetItems()
				console.log(err)
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
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.boxOfficeMovieSection {
	.section-title {
		display: block;
		float:left;
		margin-right: 1.5rem;
		padding: 0 0 1.25rem;
		font-size: 1.5rem;
		line-height: 40px;
		white-space: normal;
	}
	.sectoin-msg__loading, .sectoin-msg__danger {
		clear: both;
		display: block;
		padding-left: .625rem;
		font-size: .8125rem;
		color: #6e6e6e
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
	clear: both;
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
