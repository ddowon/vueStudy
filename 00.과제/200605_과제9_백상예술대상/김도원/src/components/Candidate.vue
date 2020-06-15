<template>
	<div class="candidate-page">
		<CandidateTab
			:tabList="tabList"
			:currentDivision="currentDivision"
			@changeDivision="setDivision" />
		<CandidateCategory
			:prizeList="currentTab.prizes"
			:currentPrize="currentPrize"
			@changePrize="setPrize" />
		<CandidateList
			:currentTab="currentTab"
			:currentPrize="currentPrize" />
	</div>
</template>

<script>
	// import { mapState, mapActions, mapGetters } from 'vuex'
	import { Fragment } from 'vue-fragment'
	import CandidateTab from '@/components/CandidateTab.vue'
	import CandidateCategory from '@/components/CandidateCategory.vue'
	import CandidateList from '@/components/CandidateList.vue'
	export default {
		name: 'candidate',
		components: {
			Fragment, CandidateTab, CandidateCategory, CandidateList
		},
		data: () => ({
			tabList: [
				{ title: 'TV부문', division: 'tv', initCode: 'T01', prizes: [], candidates: [] },
				{ title: '영화부문', division: 'movie', initCode: 'M01', prizes: [], candidates: [] },
				{ title: '연극부문', division: 'play', initCode: 'P01', prizes: [], candidates: [] }
			],
			currentDivision: '',
			currentPrize: ''
		}),
		watch: {
			// 탭이 바뀔 때마다 1번탭 카테고리를 강제로 부여하려면, currentDivision이 바뀔 때마다 currentPrize를 initCode로 설정하면 효율적
			// currentPrize가 변경되는 경우는 딱 2가지 이기 때문 (1. 탭이 바뀔 때, 카테고리를 눌렀을 때)
			currentDivision: {
				handler(newVal, oldVal) {
					if (newVal && !this.$route.params.prize_id) {
						this.setPrize(this.currentTab.initCode)
					}
				},
				immediate: true
			}
		},
		computed: {
			// currentTab에 현재 division 오브젝트를 저장해 두면 하위 컴포넌트에서 title, candidates를 활용할 수 있음
			// 만약 currentTab이 없이 currentDivision만 가지고 하위 컴포넌트에서 title을 보여주려면 마크업 구조를 변경하거나 하드 코딩해야 함
			currentTab() {
				return this.tabList.find((item) => {
					return item.division === this.currentDivision
				})
			}
		},
		created() {
			// 최초 페이지 호출 시, 1번탭, 1번탭 카테고리, 1번탭 후보 리스트를 가져오도록 초기 설정을 해야 함
			// 그런데 currentDivision이 공백일 때, mounted()에서 초기 설정을 처리하면 computed()에서 최초 1회 currentDivision을 불러오지 못하게 됨 (정확히는 currentDivision = '' 공백으로 처리하면서 에러 발생)
			// mounted() 대신 created()에서 초기 설정을 처리하면 이같은 에러가 발생하지 않으므로 데이터를 fetch하거나 초기값을 설정하는 작업은 created()를 이용할 것

			// 초기값 설정
			// 만약, router에서 division이나 initCode를 부여 받는다면 초기값이 달라짐
			// ex) candidates/movie --> this.setDivision('movie') / this.setPrize('M01')
			
			let division = (this.$route.params.division) ? (this.$route.params.division) : this.tabList[0].division
			this.setDivision(division)

			let prize = (this.$route.params.prize_id) ? (this.$route.params.prize_id) : this.currentTab.initCode
			this.setPrize(prize)

			this.fetchPrizes()
			this.fetchCandidates()
		},
		mounted() {
		},
		methods: {
			// 아래의 setDivision, setPrize 메서드는 추후 Vuex의 mutations에서 사용
			setDivision(division) {
				this.currentDivision = division
			},
			setPrize(cd) {
				this.currentPrize = cd.toUpperCase()
			},
			// 아래의 fetchPrizes, fetchCandidates 메서드는 추후 Vuex의 actions에서 사용
			fetchPrizes() {
				this.tabList.map((item, idx) => {
					this.axios.get(`/api/prizes?DIVISION=${item.division}`)
					.then((res) => {
						if (res.data.length) {
							item.prizes = res.data
						}
					}).catch((err) => {
						console.log(err)
					})
				})
			},
			fetchCandidates() {
				this.tabList.map((item, idx) => {
					this.axios.get(`/api/candidates?DIVISION=${item.division}`)
					.then((res) => {
						if (res.data.length) {
							item.candidates = res.data
						}
					}).catch((err) => {
						console.log(err)
					})
				})
			},

			// 상 목록은 고정되어 있는데 캡 메뉴를 누를 때마다 axios 요청을 보내므로,
			// 최초 1회만 상 목록 data를 fetch하도록 axios 요청을 최소화
			// getCatagory(division) {
			// 	this.axios.get(`/api/prizes?DIVISION=${division}`)
			// 	.then((res) => {
			// 		if (res.data.length) {
			// 			this.categoryList = res.data
			// 		}
			// 	}).catch((err) => {
			// 		console.log(err)
			// 	})
			// },

			// 후보 목록도 카테고리를 누를 때마다 axios 요청을 보내므로 이미지 렌더링에 시간이 조금 더 걸림
			// 상 목록과 마찬가지로 최초 1회만 푸보 목록 data를 fetch 한 후, CandidateList.vue에서 fetch한 data를 filter 메서드로 정렬처리 하면 성능이 개선됨
			// getCandidate(cd) {
			// 	this.axios.get(`/api/candidates?DIVISION=${this.currentDivision}&PRIZE_CD=${cd}`)
			// 	.then((res) => {
			// 		if (res.data.length) {
			// 			this.candidateList = res.data
			// 		}
			// 	}).catch((err) => {
			// 		console.log(err)
			// 	})
			// }
		}
	}

</script>
