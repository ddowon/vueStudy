<template>
	<table class="tbl-list">
		<thead>
		<tr>
			<th>날짜</th>
			<th>프로젝트</th>
			<th>스펙/제목</th>
			<th>진행</th>
			<th>사업</th>
			<th>디자인</th>
			<th>UI</th>
			<th>개발</th>
		</tr>
		</thead>
		<tbody>
			<tr v-for="item in list" :key="item.name">
				<td>{{ item.open }}</td>
				<td>{{ item.gameName }}</td>
				<td>`{{ item.spec }}{{ item.subject }}`</td>
				<td>{{ item.status }}</td>
				<td>{{ item.business }}</td>
				<td>{{ item.design }}</td>
				<td>{{ item.ui }}</td>
				<td>{{ item.dev }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

export default {
	props: [ 'list' ],
	
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
