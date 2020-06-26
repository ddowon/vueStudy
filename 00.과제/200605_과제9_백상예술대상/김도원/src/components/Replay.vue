<template>
	<div class="vod-page">	
		<div class="notice-title-wrap sub-title">
			<div class="container-inner">
				<h2>다시보기</h2>
				<PageTab
					:tabOptions="tabOptions"
					:tabList="tabList" />
			</div>
		</div>
		<ReplayList
			:vodList="vodList" />
		<ReplayMore
			:hasNextPage="hasNextPage"
			@getMoreItem="moreVodList" />
	</div>
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI

import PageTab from '@/components/common/PageTab.vue'
import ReplayList from '@/components/ReplayList.vue'
import ReplayMore from '@/components/button/BtnMoreItem.vue'

export default {
	components: {
		PageTab, ReplayList, ReplayMore
	},
	data: () => ({
		routerName: 'replay', 
		tabList: [
			{ title: '56회 백상', id: '56' },
			{ title: '55회 백상', id: '55' }
		],
		tabOptions: {
			routerName: 'replay_times',
			routerParamsName: 'replay_times',
			moreLinks: [
				{ href: 'http://tv.jtbc.joins.com/clip/pr10010312/pm10024332', title: '영상 더보기', target: '_blank' }
			]
		},
		currentTimes: null,
		currentPage: null,
		itemPerPage: 8,
		hasNextPage: false,
		vodList: []
	}),
	watch: {
		'$route.params.replay_times': {
			handler(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.vodList = []
					this.hasNextPage = false
				}
				if (newVal && oldVal) {
					this.fetchVodList(this.$route.params.replay_times)
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.fetchVodList(this.$route.params.replay_times)
	},
	methods: {
		setPageInformation(...info) {
			[this.currentTimes, this.currentPage, this.hasNextPage] = [...info]
		},
		fetchVodList(times, page = 1) {
			this.axios.get(`${API_URI}/replays/${times}?page=${page}&size=${this.itemPerPage}`)
			.then((res) => {
				if (res.data) {
					this.vodList = [...this.vodList, ...res.data.itemsList]
					this.setPageInformation(times, res.data.currentPage, res.data.hasNextPage)
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		moreVodList() {
			this.fetchVodList(this.currentTimes, this.currentPage + 1)
		}
	}
}
</script>