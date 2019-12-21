<template>
	<div>
		<v-alert v-model="alert.status" :type="alert.type" dense transition="scale-transition" v-html="alert.msg"></v-alert>
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
	created() {
		if (!this.projects.length && !alert.status) {
			this.fetchProject()
		}
	},
	computed: {
		...mapState('calendar', [
			'alert'
		]),
		...mapGetters('calendar', [
			'projects', 'designList', 'uiList', 'devList'
		])
	},
	methods: {
		...mapActions('calendar', [
			'fetchProject'
		])
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