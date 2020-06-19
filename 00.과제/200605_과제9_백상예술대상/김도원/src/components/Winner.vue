<template>
	<div class="awards-page" v-if="winnerList.length">
		<div class="awards-title-wrap sub-title">
			<div class="container-inner">
				<h2>역대 수상</h2>
			</div>
		</div>
		<div class="awards-list-wrap">
			<div class="container-inner">
				<SelectBox :currentTimes="currentTimes" :selectBoxList="selectBoxList" @changeTimes="changeTimes"/>
				<div class="awards-select-con">
					<div class="awards-title sector-title">
						<strong>{{currentTimes}}회 백상예술대상 수상자 · 작품</strong>
					</div>
					<div class="awards-sector-wrap sector01" v-if="tvWinner.length">
						<div class="award-sector-title">
							<h3>TV부문 수상자 · 작품</h3>
						</div>
						<div class="awards-con">
							<FeaturedWinner :featuredWinner="tvFeaturedWinner" />
							<WinnerList :winnerList="tvWinner"/>
						</div>
					</div>

					<div class="awards-sector-wrap sector02" v-if="movieWinner.length">
						<div class="award-sector-title">
							<h3>영화부문 수상자 · 작품</h3>
						</div>
						<div class="awards-con">
							<FeaturedWinner :featuredWinner="movieFeaturedWinner" />
							<WinnerList :winnerList="movieWinner"/>
						</div>
					</div>

					<div class="awards-sector-wrap sector03" v-if="playWinner.length">
						<div class="award-sector-title">
							<h3>연극부문 수상자 · 작품</h3>
						</div>
						<div class="awards-con">
							<FeaturedWinner :featuredWinner="playFeaturedWinner" />
							<WinnerList :winnerList="playWinner"/>
						</div>
					</div>

					<div class="awards-sector-wrap sector04" v-if="specialWinner.length">
						<div class="award-sector-title">
							<h3>특별상 부문 수상자</h3>
						</div>
						<div class="awards-con">
							<FeaturedWinner :featuredWinner="specialFeaturedWinner" />
							<WinnerList :winnerList="specialWinner"/>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div><!-- .페이지명-page -->
</template>

<script>
import SelectBox from '@/components/SelectBox.vue'
import FeaturedWinner from '@/components/FeaturedWinner.vue'
import WinnerList from '@/components/WinnerList.vue'
export default {
	name: 'winner',
	components: {
		SelectBox, FeaturedWinner, WinnerList
	},
	data:() => ({
		selectBoxList: [
			{ times: '55' },
			{ times: '54' },
			{ times: '53' }
		],
		winnerList: [
			{ division: 'tv', winner: [] },
			{ division: 'movie', winner: [] },
			{ division: 'play', winner: [] },
			{ division: 'special', winner: [] },
		],
		currentTimes: '55'
	}),
	computed: {
		tvFeaturedWinner() {
			return this.winnerList[0].winner.find((item) => {
				return item.PRIZE_NM.includes('대상')
			})
		},
		tvWinner() {
			return this.winnerList[0].winner.filter((item) => {
				return !item.PRIZE_NM.includes('대상')
			})
		},
		movieFeaturedWinner() {
			return this.winnerList[1].winner.find((item) => {
				return item.PRIZE_NM.includes('대상')
			})
		},
		movieWinner() {
			return this.winnerList[1].winner.filter((item) => {
				return !item.PRIZE_NM.includes('대상')
			})
		},
		playFeaturedWinner() {
			return this.winnerList[2].winner.find((item) => {
				return item.PRIZE_NM.includes('대상')
			})
		},
		playWinner() {
			return this.winnerList[2].winner.filter((item) => {
				return !item.PRIZE_NM.includes('대상')
			})
		},
		specialFeaturedWinner() {
			return this.winnerList[3].winner.find((item) => {
				return item.PRIZE_NM.includes('대상')
			})
		},
		specialWinner() {
			return this.winnerList[3].winner.filter((item) => {
				return !item.PRIZE_NM.includes('대상')
			})
		}
		
	},
	created() {
		this.currentTimes = (this.$route.params.times) ?  (this.$route.params.times) : this.currentTimes

		let selectedTimes = (this.$route.params.times) ?  (this.$route.params.times) : this.currentTimes
		this.fetchDivision(selectedTimes)

	},
	mounted() {

	},
	methods: {
		fetchDivision(award_num) {

			this.winnerList.map((item, index) => {
				this.axios.get(`http://baeksang-api.herokuapp.com/api/winners/${award_num}/${item.division}`)
				.then((res) => {
					item.winner = res.data
				}).catch((err) => {
					console.log(err)
				})
			})

			// this.winnerList.map((item, index) => {
			// 	this.axios.get(`http://baeksang-api.herokuapp.com/api/winners/${award_num}`)
			// 	.then((res) => {
			// 		res.data.forEach((data, index) => {
			// 			if( item.division == data.DIVISION ){
			// 				item.winner.push(data)
			// 			}
			// 		})
			// 	}).catch((err) => {
			// 		console.log(err)
			// 	})
			// })
		},
		changeTimes(times) {
			this.currentTimes = times
			this.fetchDivision(times)
		}
	}
}

</script>