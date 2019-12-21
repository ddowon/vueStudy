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
import { mapState, mapActions, mapGetters } from 'vuex'
import { formatNumber, formatStaff } from '@/utils/mixin'
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
	mixins: [ formatNumber, formatStaff ],
	data: () => ({
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
		...mapState('boxOffice', [
			'today', 'targetDate', 'rankList', 'isLoading', 'pageOptions'
		]),
		...mapGetters('boxOffice', [
			'year', 'month', 'date', 'topRankList','targetYear'
		]),
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
		...mapActions('boxOffice', [
			'fetchItems', 'changeDate', 'changeCurrentPage'
		]),
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
	padding: 20px 40px 40px;
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
