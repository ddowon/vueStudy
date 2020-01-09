<template>
	<div>
		<div>{{list.title}}</div>
		<button @click="filterSpec('all')">전체 보기</button>
		<button @click="filterSpec('full')">풀페이지만 보기</button>
		<div>
			<button @click="filterProject('천애명월도')">천애명월도만 보기</button>
			<button @click="filterProject('엘소드')">엘소드만 보기</button>
			<button @click="filterProject('클로저스')">클로저스만 보기</button>
			<button @click="filterProject('테라')">테라만 보기</button>
			<button @click="filterProject('TOS')">TOS만 보기</button>
		</div>
		<p>프로젝트 건수 : {{getList.length}}</p>
		<table class="user-jobs">
			<colgroup>
				<col width="130">
				<col width="160">
				<col width="*">
				<col width="75">
				<col width="75">
				<col width="75">
				<col width="75">
				<col width="75">
			</colgroup>
			<template v-for="(job, index) in pagedList">
				<template v-if="!isSameDate(index)">
					<tr class="divider" :class="{ 'no_height': index == 0 }"><th colspan="8"></th></tr>
					<tr class="theader" :key="index">
						<th class="date">{{ job.open | formatDate }}</th>
						<th>프로젝트</th>
						<th>스펙/제목</th>
						<th>진행</th>
						<th>사업</th>
						<th>디자인</th>
						<th>UI</th>
						<th>개발</th>
					</tr>
				</template>
				<tr :class="{ 'full': (job.spec.toLowerCase().indexOf('full') != -1 || job.spec.toLowerCase().indexOf('풀') != -1) }">
					<td class="opened"></td>
					<td class="project">{{ job.gameName }}</td>
					<td class="subject"><span class="badge" v-if="job.spec">{{ job.spec }}</span> {{ job.subject }}</td>
					<td class="status">{{ job.status }}</td>
					<td class="business">{{ job.business }}</td>
					<td class="design">{{ job.design }}</td>
					<td class="ui">{{ job.ui }}</td>
					<td class="dev">{{ job.dev }}</td>
				</tr>
			</template>
		</table>
		<Pagination :item-per-page="pageOptions.itemPerPage" @change="changeCurrentPage" :total="total"/>
	</div>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
	props: {
		list: Array
	},
	components: {
		Pagination,
	},
	data: () => ({
		filterList: [],
		
	}),
	computed: {
		...mapState('report', [
			'pageOptions'
		]),
		startNum() {
			return (this.pageOptions.currentPage - 1) * this.pageOptions.itemPerPage
		},
		endNum() {
			return this.pageOptions.currentPage * this.pageOptions.itemPerPage
		},
		pagedList() {
			return this.filterList.slice(this.startNum, this.endNum)
		},
		getList() {
			if(!this.filterList.length){
				this.filterList = this.list
			}
			return this.filterList
		},
		total() {
			return this.pageOptions.totalCount = this.getList.length
		}
	},
	methods: {
		...mapActions('report', [
		]),
		isSameDate(idx) {
			return (this.getList[idx - 1]) ? this.getList[idx - 1].open == this.getList[idx].open : false
		},
		filterSpec(val){
			if( val === 'full' ){
				this.filterList = this.list.filter(item => item.spec.toLowerCase().includes('full'))
			} else {
				this.filterList = this.list
			}
		},
		filterProject(val){
			if( !this.filterList.length ){
				this.filterList = this.list
			} else {
				this.filterList = this.list.filter(item => item.gameName.includes(val))
			}
		},
		changeCurrentPage(currentPage) {
			this.pageOptions.currentPage = currentPage
		}
	},
	filters: {
		formatDate(val) {
			let week = new Array('(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)')
			let day = new Date(val).getDay()
			return `${val.substr(5)} ${week[day]}`
		}
	}
};
</script>

<style scoped>
	.user-jobs {clear:both;width:100%;font-size:0.8rem;border-collapse:collapse;border-spacing:0;table-layout:fixed}
	.user-jobs tr:first-child td {padding-top:4px;height:44px}
	.user-jobs tr.divider.no_height {height:0;padding:0}
	.user-jobs tr.divider {height:40px}
	.user-jobs tr.theader th {height:55px;color:#8898aa;border-top:1px solid #c6c8f4;border-bottom:1px solid #e9ecef;background-color:#f6f9fc}
	.user-jobs tr.theader .date {font-size:1.2rem;color:#6b6ae4}
	.user-jobs tr.full td {background:#fffde9}
	.user-jobs tr.full td.subject {color:#f44336}
	.user-jobs td {width:100px;height:40px;vertical-align:middle;color:#525f7f;border-bottom:1px solid #e9ecef}
	.user-jobs .project,
	.user-jobs .status,
	.user-jobs .business,
	.user-jobs .design,
	.user-jobs .ui,
	.user-jobs .dev,
	.user-jobs .spec {text-align:center}
	.user-jobs .opened {background:none !important;border:none !important}
	.user-jobs .badge {display:inline-block;margin-right:2px;padding:0 6px 1px;background:#dee4ea;border-radius:5px}
	.user-jobs tr.full .badge {background:#f1f36e}
</style>
