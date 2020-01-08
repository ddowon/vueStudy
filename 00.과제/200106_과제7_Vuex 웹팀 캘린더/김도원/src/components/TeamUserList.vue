<template>
	<div>
		<v-alert v-model="alert.status" :type="alert.type" dense transition="scale-transition" v-html="alert.msg"></v-alert>
		<div class="glory">
			<h2>명예의 전당</h2>
			
			<div @click="sortList()">클릭</div>
			<ul v-if="list.length">
				<li v-for="(user, idx) in list" :key="idx" v-if=" idx < 3">
					<span>작업자 : {{user.name}}</span><span>프로젝트 건수 :{{user.jobLen}}</span>
				</li>
			</ul>
		</div>
		<div class="group">
			<h2><v-icon>color_lens</v-icon>디자인 파트</h2>
			<TeamUserListItem :list="designList" :alert-status="alert.status"/>
		</div>
		<div class="group">
			<h2><v-icon>crop</v-icon>UI 파트</h2>
			<TeamUserListItem :list="uiList" :alert-status="alert.status"/>
		</div>
		<div class="group">
			<h2><v-icon>developer_mode</v-icon>개발 파트</h2>
			<TeamUserListItem :list="devList" :alert-status="alert.status"/>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import TeamUserListItem from '@/components/TeamUserListItem.vue'

export default {
	components: {
		TeamUserListItem
	},
	data: () => ({
		list: ''
	}),
	created() {
		if (!this.projects.length && !alert.status) {
			this.fetchProject()
			this.fetchLastProject()
		}
		
	},

	computed: {
		...mapState('calendar', [
			'alert', 'users'
		]),
		...mapGetters('calendar', [
			'projects', 'designList', 'uiList', 'devList'
		]),		
	},
	methods: {
		...mapActions('calendar', [
			'fetchProject', 'fetchLastProject'
		]),
		jobsLen() {
			return this.list = this.users.map((user) => {
				return {name: user.name, jobLen: user.jobs.length + user.lastProjects.length }
			})			
		},
		lastJobsLen() {
			return this.list = this.users.map((user) => {
				return {name: user.name, jobLen: user.jobs.length}
			})	
		},
		sortList() {
			this.jobsLen()
			this.list.sort((a, b) => {
				return b.jobLen - a.jobLen
			})
		}

	}
}
</script>

<style scoped>
	.group {clear:both;overflow:hidden;margin-bottom:25px}
	.group:first-child {margin-top:10px}
	.group:last-child {margin-bottom:0}
	.group > h2 {margin-bottom:10px;color:#32325d}
	.group > h2 .v-icon {margin-right:3px;vertical-align:-3.5px;color:#32325d}
</style>