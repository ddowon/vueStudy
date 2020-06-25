<template>
	<div class="vod-page">	
		<div class="notice-title-wrap sub-title">
			<div class="container-inner">
				<h2>다시보기</h2>

				<CandidateTab
				:routerTo="routerTo" :tabList="tabList" />

				<a class="box-btn more-btn" href="http://tv.jtbc.joins.com/clip/pr10010312/pm10024332"
						target="_blank">
					<span>영상 더보기</span>
					<em class="ico-more"></em>
				</a>
			</div>
		</div>
		<ReplayList :vodList="vodList" :currentTimes="currentTimes" :hasNextPage="vodInfo.hasNextPage" @moreVodList="moreVodList"/>
	</div>
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI

import CandidateTab from '@/components/CandidateTab.vue'
import ReplayList from '@/components/ReplayList.vue'
export default {
	components: { CandidateTab, ReplayList },
	data: () => ({
		routerName: 'replay', 
		tabList: [
			{ title: '56회 백상', id: '56' },
			{ title: '55회 백상', id: '55' }
		],
		routerTo: {
			name: 'replay_times',
			paramsName: 'replay_times'	
		},
		currentTimes: null,
		vodList: [],
		vodInfo: [],
		pageNum: 1
	}),
	watch: {
		'$route.params.replay_times': {
			handler(newVal, oldVal) {
				if (newVal && oldVal) {
					this.setCurrentTimes(this.$route.params.replay_times)
				}
				if (newVal !== oldVal) {
					this.vodList = [];
					this.fetchVodList(this.currentTimes, this.pageNum)
				}
			},
			deep: true,
			immediate: true
		}
	},

	created() {
		this.setCurrentTimes(this.$route.params.replay_times)

		this.fetchVodList(this.currentTimes, this.pageNum)
	},

	methods: {
		setCurrentTimes(times) {
			this.currentTimes = times
		},
		fetchVodList(times, pageNum) {

			this.axios.get(`${API_URI}/replays/${times}?page=${pageNum}&size=8`)
			.then((res) => {
				if (res.data) {
					this.vodInfo = res.data
					this.vodList = [...this.vodList, ...res.data.itemsList]
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		moreVodList() { 
			this.fetchVodList(this.currentTimes, this.vodInfo.nextPage)
		}
		
	}
}
</script>