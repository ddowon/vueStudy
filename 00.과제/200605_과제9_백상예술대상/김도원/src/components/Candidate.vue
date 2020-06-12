<template>
	<div class="container-wrap sub-page">
		<div class="candidate-page">
			<CandidateTab :tabList="tabList" :currentDivisionIdx="currentDivisionIdx" @changeDivision="changeDivision"/>
			<CandidateCatecory :categoryList="categoryList" @changeCate="changeCate"/>
			<CandidateList :list="candidateList" :currentCategory="currentCategory" :currentdivision="currentdivision"/>
		</div>
	</div>
</template>

<script>
	// import { mapState, mapActions, mapGetters } from 'vuex'
	import { Fragment } from 'vue-fragment'
	import CandidateTab from '@/components/CandidateTab.vue'
	import CandidateCatecory from '@/components/CandidateCatecory.vue'
	import CandidateList from '@/components/CandidateList.vue'
	export default {
		name: 'candidate',
		components: {
			Fragment, CandidateTab, CandidateCatecory, CandidateList
		},
		props: {
		},
		data: () => ({
			tabList: [
				{title: 'TV부문', id: 'tv'},
				{title: '영화부문', id: 'movie'},
				{title: '연극부문', id: 'play'}
			],
			categoryList: null,
			currentdivision: null,
			currentCategory: '드라마 작품상',
			currentDivisionIdx: 0,
			candidateList: [],
		}),
		computed: {
			
		},
		created() {
			this.getCandidate('tv', 'T01')
	
		},
		mounted() {
			this.changeDivision(0)
		},
		methods: {
			changeDivision(idx) {
				this.currentDivisionIdx = idx
				this.getCatagory(this.tabList[idx].id)
			},

			getCatagory(division) {
				this.axios.get(`/api/prizes?DIVISION=${division}`)
				.then((res) => {
					if (res.data.length) {
						this.categoryList = res.data
					}
					
				}).catch((err) => {
					console.log(err)
				})
			},

			getCandidate(division, cd) {
				this.axios.get(`/api/candidates?DIVISION=${division}&PRIZE_CD=${cd}`)
				.then((res) => {
					if (res.data.length) {
						this.candidateList = res.data
					}
					
				}).catch((err) => {
					console.log(err)
				})
			},

			changeCate(division, cd, nm) {
				this.currentCategory = nm
				this.currentdivision = division
				this.getCandidate(division, cd)
			}

		}
	}

</script>
