<template>
	<div class="awards-page">
		<div class="awards-title-wrap sub-title">
			<div class="container-inner">
				<h2>역대 수상</h2>
			</div>
		</div>
		<div class="awards-list-wrap" v-if="currentTimes">
			<div class="container-inner">
				<WinnerCategory
					:categories="winnerCategories" />

				<div class="awards-select-con">
					<div class="awards-title sector-title">
						<strong>{{ currentTimes }}회 백상예술대상 수상자 · 작품</strong>
					</div>
					<!-- // 반복되는 부분이 많으니 v-for 디렉티브로 awards-sector-wrap을 리팩토링 -->
					<template v-for="(item, index) in winnerList">
						<div :class="`awards-sector-wrap sector0${index + 1}`" v-if="item.winners.length" :key="item.division">
							<div class="award-sector-title">
								<h3>{{ item.title }} 수상자 · 작품</h3>
							</div>
							<WinnerList
								:winnerList="item.winners" />
						</div>
					</template>
				</div>
			</div>
		</div>
	</div><!-- .페이지명-page -->
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI

import WinnerCategory from '@/components/winner/WinnerCategory.vue'
import WinnerList from '@/components/winner/WinnerList.vue'

export default {
	name: 'winner',
	components: {
		WinnerCategory, WinnerList
	},
	data:() => ({
		winnerCategories: [
			{ times: '55' },
			{ times: '54' },
			{ times: '53' }
		],
		winnerList: [
			{ title: 'TV부문', division: 'tv', winners: [] },
			{ title: '영화부문', division: 'movie', winners: [] },
			{ title: '연극부문', division: 'play', winners: [] },
			{ title: '특별상부문', division: 'special', winners: [] }
		],
		currentTimes: null
	}),
	watch: {
		// SelectBox.vue의 회차 클릭 시 브라우저 URL을 변경하기 위해 changeTimes를 부모로 $emit 처리하지 않고 $router.push 처리함
		// 이에 따라 watch 대상을 $route.params.times로 설정
		// $route.params.times가 변경되면 fetchWinners()를 호출함
		'$route.params.times': {
			handler(newVal, oldVal) {
				if (newVal && oldVal) {
					this.fetchWinners(this.$route.params.times)
				}
			},
			deep: true,
			immediate: true
		}
	},
	computed: {
	},
	created() {
		// ES6의 기본 매개변수를 활용하면 selectedTimes 변수를 만들지 않아도 됨
		// this.currentTimes = (this.$route.params.times) ? (this.$route.params.times) : this.currentTimes
		// let selectedTimes = (this.$route.params.times) ?  (this.$route.params.times) : this.currentTimes
		// this.fetchWinners(selectedTimes)

		this.fetchWinners(this.$route.params.times)
	},
	methods: {
		// 아래의 setTimes 메서드는 추후 Vuex의 mutations에서 사용
		setTimes(times) {
			this.currentTimes = times
		},
		// 아래의 fetchWinners 메서드는 추후 Vuex의 actions에서 사용
		// SelectBox.vue에서 회차를 선택할 때마다 axios 요청 전송
		// 만약 http://BASE_URL/winner/57 로 접근 시, fetchWinners('57')를 호출함
		// 57회는 존재하지 않으므로 axios 요청 이후 정상적으로 data를 수신하면 setTimes로 숫자를 변경하도록 개선
		fetchWinners(times) {
			this.winnerList.map((item, index) => {
				this.axios.get(`${API_URI}/winners/${times}/${item.division}`)
				.then((res) => {
					item.winners = (res.data.length) ? res.data : []
					this.setTimes(times)
				}).catch((err) => {
					console.error(`${err.response.status}: ${err.response.data.message}`)
				})
			})
		}
	}
}
</script>