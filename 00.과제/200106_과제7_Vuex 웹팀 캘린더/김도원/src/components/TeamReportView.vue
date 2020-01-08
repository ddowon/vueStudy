<template>
	<div>
		<ProjectTable :list="projects" />
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import ProjectTable from '@/components/common/ProjectTable.vue'

export default {
	components: {
		ProjectTable
	},
	created() {
		if (!this.projects.length) {
			this.fetchProject()
			this.fetchLastProject()
		}

	},
	computed: {

		...mapGetters('report', [
			'projects'
		])
	},
	methods: {
		...mapActions('report', [
			'fetchProject', 'fetchLastProject'
		]),

	}
}
</script>

<style scoped>
	.group {clear:both;overflow:hidden;margin-bottom:25px}
	.group:first-child {margin-top:10px}
	.group:last-child {margin-bottom:0}
	.group > h2 {margin-bottom:10px;color:#32325d}
	.group > h2 .v-icon {margin-right:3px;vertical-align:-3.5px;color:#32325d}
	.group .btn_goBack {display:block;width:75px;height:40px;margin:20px auto 0;border-radius:6.5px;background:linear-gradient(50deg,#6f68e4 0,#2dcecc 100%) !important;box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08) !important}
	.group .btn_goBack >>> .v-icon {line-height:18px}
	.group > h3 {float:left;margin-right:15px;font-size:1.7rem;font-weight:bold;color:#6b6ae4}
	.group > p {position:relative;font-size:0.9rem;color:#525f7f}
	.group > p.txt_count {float:left;margin-bottom:20px}
	.group > h3, .group > p {line-height:28px}
	.group > p:after {display:block;content:'';clear:both}
	.group .count {color:#f5365c;font-weight:bold}
</style>

