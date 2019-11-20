<template>
	<table class="tbl-list">
		<thead>
		<tr>
			<th>순위</th>
			<th>영화정보</th>
			<th>일 관람객</th>
			<th>누적 관람객</th>
		</tr>
		</thead>
		<tbody>
		<tr v-for="movie in list" :key="movie.movieNm" :class="{ top: movie.rank < 4 }">
			<td class="rank"> {{ movie.rank }} </td>
			<td class="info">
				<img :src="movie.imgPath" :alt="movie.movieNm">
				<span class="info-title">
					{{movie.movieNm}}
					<span class="info-rating">
					<span class="info-rating-star" :style="`width:${movie.userRating * 10}%`"></span>
					</span> 
				</span>
				<span class="info-opendate">개봉: {{ movie.openDt }}</span>
				<span class="info-director">감독: {{ movie.director | formatStaff }}</span>
				<span class="info-actor">출연: {{ movie.actor | formatStaff }}</span>
			</td>
			<td class="daily_count">{{ movie.audiCnt | formatNumber }}</td>
			<td class="total_count">{{ movie.audiCnt | formatNumber }}</td>
		</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: ['list'],
	filters: {
		formatNumber(val){
			if (!val) return ''
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		},
		formatStaff(val) {
			if(!val) return ''
			let str = val.split('|').join(', ')
			return str.substring(0, (str.length - 2))
		}
	}
}
</script>

<style lang="scss" scoped>
$img-rating: 'https://i.imgur.com/GS2Pna9.png';
.tbl-list {
	width: 100%;
	border-collapse: collapse;
	empty-cells: show;
	border-spacing: 0;
	border-bottom: 1px solid #ccc;
	font-size: 13px;
	background-color: #212121;
	thead th {
		height: 58px;
		font-weight: 400;
		text-align: center;
		background: #191919;
		letter-spacing: -.5px
	}
	tbody tr {
		&.top {
			background-color: #272727;
			.rank, .info-title, .daily_count, .total_count {
				color: #9d81ff !important;
				font-weight: bold;
			}
		}
		&:hover {
			background: #272727;
			.title a:after {
				content: '';
				display: block;
				width: 100%;
				height: 1px;
				position: absolute;
				left: 0;
				bottom: -3px;
				background: #6e6e6e
			}
		}
		td {
			position: relative;
			color: #a5a5a5;
			font-size: 13px;
			text-align: center;
			border-bottom: 1px solid #303030;
			padding: 10px;
			vertical-align: middle;
			&.rank {
				width: 95px;
				font-size: 20px;
			}
			&.info {
				text-align: left;
				img {
					display: block;
					float: left;
					width: 80px;
				}
				> span {
					display: block;
					padding-left: 100px;
					margin-top: 2px;
					font-size: 12px;
					&.info-title {
						margin-top: 18px;
						margin-bottom: 6px;
						color: #ededed;
						font-size: 15px;
						.info-rating, .info-rating-star {
							width: 79px;
							height: 14px;
						}
						.info-rating {
							position: relative;
							display: inline-block;
							margin-left: 4px;
							background: url($img-rating) no-repeat -1px -19px;
							.info-rating-star {
								position: absolute;
								display: block;
								top: 0;
								left: 0;
								width: 0;
								height: 14px;
								background: url($img-rating) no-repeat -1px -3px;
							}
						}
					}
				}
			}
			&.daily_count, &.total_count {
				width: 100px;
			}
		}
	}
}
</style>
