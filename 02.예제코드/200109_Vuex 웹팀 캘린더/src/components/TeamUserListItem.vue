<template>
	<div class="group-list">
		<div class="group-user" v-for="(user, index) in list" :key="index">
			<h3>{{ user.name }}</h3>
			<template v-if="alertStatus">
				<p>최근 담당 프로젝트를 불러오는 중입니다.</p>
			</template>
			<template v-else-if="user.jobs.length">
				<p>최근 담당 프로젝트 수 <span class="count">{{ user.jobs.length }}</span>건 (Full <span class="count">{{ getFullpageCount(user.jobs) }}</span>건)<v-btn class="btn_more" depressed dark small @click="goToUserView(user.id)"><v-icon>chevron_right</v-icon></v-btn></p>
				<table class="user-jobs">
					<thead>
						<tr>
							<th class="opened">오픈일</th>
							<th class="subject">프로젝트</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(job, index) in user.jobs" :key="index">
							<template v-if="index < 3">
								<td class="opened">{{ job.open.substr(5) }}</td>
								<td class="subject"><span class="badge" :class="{ 'full': (job.spec.toLowerCase().indexOf('full') != -1 || job.spec.toLowerCase().indexOf('풀') != -1) }" v-if="job.spec">{{ job.spec }}</span> [{{ job.gameName }}] {{ job.subject }}</td>
							</template>
						</tr>
					</tbody>
				</table>
			</template>
			<template v-else>
				<p>최근 담당 프로젝트가 없습니다.</p>
			</template>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	props: {
		list: Array,
		alertStatus: Boolean
	},
	computed: {
		...mapGetters('calendar', [
			'getFullpageCount'
		])
	},
	methods: {
		...mapActions('calendar', [
			'goToUserView'
		])
	}
}
</script>

<style scoped>
	.group-user {float:left;width:32%;height:210px;margin:0 0 2% 2%;word-break:break-word;border-radius:.375rem;background-color:#f6f9fc;border:1px solid #e9eff5;box-shadow:0 3px 6px rgba(50,50,93,.04), 0 1px 1px rgba(0,0,0,.03) !important}
	.group-user:nth-child(3n+1) {clear:both;margin-left:0}
	.group-user > h3 {padding:1rem 1rem 0.05rem;font-size:1.2rem;font-weight:bold;color:#6b6ae4}
	.group-user > p {position:relative;padding-left:1rem;margin-bottom:0.9rem;font-size:0.9rem;color:#525f7f}
	.group-user .count {color:#f5365c;font-weight:bold}
	.group-user .btn_more {position:absolute;top:-1.65rem;right:1rem;min-width:40px;width:40px;height:40px;border-radius:20%;background:linear-gradient(50deg,#6f68e4 0,#2dcecc 100%) !important;box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08) !important}
	.group-user .btn_more >>> .v-icon {line-height:18px}
	.user-jobs {width:100%;font-size:0.8rem;border-collapse:collapse;border-spacing:0;table-layout:fixed}
	.user-jobs th, .user-jobs td {vertical-align:middle;color:#525f7f}
	.user-jobs th {height:25px;color:#8898aa;background-color:#fff}
	.user-jobs tr:first-child td {padding-top:4px;height:32px}
	.user-jobs td {height:28px}
	.user-jobs .opened {width:66px;padding:0 0.7rem 0 1rem;text-align:center}
	.user-jobs .subject {overflow:hidden;padding-right:1.2rem;text-overflow:ellipsis;white-space:nowrap}
	.user-jobs .subject .badge {display:inline-block;margin-right:2px;padding:0 6px 1px;background:#dee4ea;border-radius:5px}
	.user-jobs .subject .badge.full {background:#f1f36e}
</style>