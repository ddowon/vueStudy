<template>
	<div>
		<v-alert v-model="alert.status" :type="alert.type" dense transition="scale-transition" v-html="alert.msg"></v-alert>
		<v-row class="fill-height">
			<v-col>
				<v-sheet class="v-calendar-header" height="64">
					<v-toolbar flat color="white">
						<v-btn outlined class="mr-4" @click="setToday">
						Today
						</v-btn>
						<v-btn fab text small @click="prev">
						<v-icon small>mdi-chevron-left</v-icon>
						</v-btn>
						<v-toolbar-title>{{ title }}</v-toolbar-title>
						<v-btn fab text small @click="next">
						<v-icon small>mdi-chevron-right</v-icon>
						</v-btn>
						<div class="flex-grow-1"></div>
						<v-menu bottom right>
						<template v-slot:activator="{ on }">
							<v-btn
							outlined
							v-on="on"
							>
							<span>{{ typeToLabel[type] }}</span>
							<v-icon right>mdi-menu-down</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item @click="type = 'day'">
							<v-list-item-title>Day</v-list-item-title>
							</v-list-item>
							<v-list-item @click="type = 'week'">
							<v-list-item-title>Week</v-list-item-title>
							</v-list-item>
							<v-list-item @click="type = 'month'">
							<v-list-item-title>Month</v-list-item-title>
							</v-list-item>
						</v-list>
						</v-menu>
					</v-toolbar>
				</v-sheet>
				<v-sheet height="830">
					<v-calendar
						ref="calendar"
						v-model="focus"
						color="primary"
						:events="events"
						:event-color="getEventColor"
						:event-margin-bottom="4"
						:now="getToday"
						:type="type"
						@click:event="showEvent"
						@click:more="viewDay"
						@click:date="viewDay"
						@change="updateRange"
					></v-calendar>
					<v-menu
						v-model="selectedOpen"
						:close-on-content-click="true"
						:activator="selectedElement"
						min-width="350px"
						max-width="600px"
						offset-y
					>
						<v-card
						color="grey lighten-4"
						min-width="350px"
						max-width="600px"
						class="v-calendar__detail"
						flat
						>
							<v-toolbar
								:color="selectedEvent.color"
								dark
								height="50"
							>
								<v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
							</v-toolbar>
							<v-card-text>
								<span v-html="selectedEvent.details"></span>
							</v-card-text>
						</v-card>
					</v-menu>
				</v-sheet>
			</v-col>
		</v-row>
		<v-row class="fill-height">
			<v-col>
				<div class="group">
					<ProjectTable :list="projects" />
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import ProjectTable from '@/components/common/ProjectTable.vue'

export default {
	components: {
		ProjectTable
	},
	data: () => ({
		type: 'month',
		focus: '',
		typeToLabel: {
			month: 'Month',
			week: 'Week',
			day: 'Day'
		},
		start: null,
		end: null,
		selectedEvent: {},
		selectedElement: null,
		selectedOpen: false
	}),
	computed: {
		...mapState('calendar', [
			'events', 'alert'
		]),
		...mapGetters('calendar', [
			'projects', 'getToday'
		]),
		title() {
			const { start, end } = this
			if (!start || !end) {
				return ''
			}

			const startYear = start.year + '년'
			const startMonth = this.monthFormatter(start)
			const startDay = start.day + '일'

			switch (this.type) {
				case 'month':
					return `${startYear} ${startMonth}`
				case 'week':
				case 'day':
					return `${startYear} ${startMonth} ${startDay}`
			}
			return ''
		},
		monthFormatter() {
			return this.$refs.calendar.getFormatter({
				timeZone: 'UTC', month: 'long',
			})
		}
	},
	created() {
		if (!this.projects.length && !alert.status) {
			this.fetchProject()
			// this.fetchLastProject()
			// this.fetchLastProject(2018)
			this.fetchLastProject(2019)
		}
	},
	mounted() {
		this.$refs.calendar.checkChange()
	},
	methods: {
		...mapActions('calendar', [
			'fetchProject'
		]),
		fetchLastProject(payload){
			this.$store.dispatch('calendar/fetchLastProject', payload)
		},
		viewDay({ date }) {
			this.focus = date
			this.type = 'day'
		},
		getEventColor(event) {
			return event.color
		},
		setToday() {
			this.focus = this.getToday
		},
		prev() {
			this.$refs.calendar.prev()
		},
		next() {
			this.$refs.calendar.next()
		},
		showEvent({ nativeEvent, event }) {
			const open = () => {
				this.selectedEvent = event
				this.selectedElement = nativeEvent.target
				setTimeout(() => this.selectedOpen = true, 10)
			}

			if (this.selectedOpen) {
				this.selectedOpen = false
				setTimeout(open, 10)
			} else {
				open()
			}

			nativeEvent.stopPropagation()
		},
		updateRange({ start, end }) {
			this.start = start
			this.end = end
		}
	}
}
</script>

<style scoped>
	.v-calendar-header >>> .v-toolbar__content {padding:0}
	.v-calendar >>> .v-event {margin-left:auto;margin-right:auto}
	.v-calendar >>> .v-event-more {margin:0 auto 2px;padding-right:2px;text-align:right;font-weight:normal;color:#825ee4 !important}
	.v-calendar >>> .v-calendar-daily_head-weekday,
	.v-calendar >>> .v-calendar-weekly__head-weekday {padding:10px 0;background-color:#f6f9fc !important;border-top:1px solid #e9ecef;border-bottom:1px solid #e9ecef;color:#8898aa !important}
	.v-calendar >>> .v-calendar-daily_head-day.v-present .primary--text,
	.v-calendar >>> .v-calendar-weekly__head-weekday.v-present.primary--text {color:#825ee4 !important}
	.v-calendar >>> .v-calendar-daily_head-day:nth-child(2) .v-calendar-daily_head-weekday,
	.v-calendar >>> .v-calendar-weekly__head-weekday:first-child {color:#ff7f61 !important}
	.v-calendar >>> .v-calendar-daily_head-day:last-child .v-calendar-daily_head-weekday,
	.v-calendar >>> .v-calendar-weekly__head-weekday:last-child {color:#65a1ff !important}
	.v-calendar >>> .v-calendar-daily_head-day,
	.v-calendar >>> .v-calendar-daily__intervals-head,
	.v-calendar >>> .v-calendar-daily__day,
	.v-calendar >>> .v-calendar-daily__day-interval,
	.v-calendar >>> .v-calendar-weekly__day,
	.v-calendar >>> .v-calendar-weekly__head-weekday {border-color:#e9ecef !important}
	.v-calendar >>> .v-calendar-daily_head-day:nth-child(2),
	.v-calendar >>> .v-calendar-daily__day:first-child,
	.v-calendar >>> .v-calendar-weekly__day:first-child,
	.v-calendar >>> .v-calendar-weekly__head-weekday:first-child {border-left:1px solid #e9ecef}
	.v-calendar >>> .v-calendar-daily_head-day.v-past .v-event,
	.v-calendar >>> .v-calendar-weekly__day.v-past .v-event {opacity:0.7;background-color:#aec3d8 !important}
	.v-calendar >>> .v-calendar-daily_head-day.v-past .v-event:hover,
	.v-calendar >>> .v-calendar-weekly__day.v-past .v-event:hover {opacity:1}
	.v-calendar >>> .v-calendar-daily_head-day.v-present,
	.v-calendar >>> .v-calendar-weekly__day.v-present {background-color:#fffde9}
	.v-calendar >>> .v-calendar-weekly__day.v-outside {background-color:#fbfbfb !important}
	.v-calendar >>> .v-calendar-daily_head-day-label,
	.v-calendar >>> .v-calendar-weekly__day-label {margin:0}
	.v-calendar >>> .v-calendar-daily_head-day-label button,
	.v-calendar >>> .v-calendar-weekly__day-label button {width:30px;height:30px;margin:5px 0}
	.v-calendar >>> .v-calendar-daily_head-day-label .primary,
	.v-calendar >>> .v-calendar-weekly__day-label .primary {background-color:#ead925 !important}
	.v-calendar >>> .v-calendar-daily__intervals-head,
	.v-calendar >>> .v-calendar-daily__body {display:none !important}
	.v-calendar__detail >>> .v-toolbar {box-shadow:none}
	.v-calendar__detail >>> .v-toolbar__content {padding:0}
	.v-calendar__detail >>> .v-toolbar__title {padding:0 1.15rem 0 1.1rem;font-size:1rem}
	.v-calendar__detail >>> .v-card__text {padding:16px;background-color:#fff}
	.v-calendar__detail >>> .v-card__text > span {display:block}
	.v-calendar__detail >>> .badges {margin-bottom:10px;font-size:13px;color:#fff}
	.v-calendar__detail >>> .badges > span {display:inline-block;line-height:22px;margin-right:5px;padding:0.15rem 0.6rem 0.1rem;border-radius:20px}
	.v-calendar__detail >>> .badges .badge_status {background-color:#65a1ff}
	.v-calendar__detail >>> .badges .badge_spec {background-color:#825ee4}
	.v-calendar__detail >>> .desc {margin:0;padding:0 4px;color:#32325d}
	.v-calendar__detail >>> .desc {overflow:hidden}
	.v-calendar__detail >>> .desc dt,
	.v-calendar__detail >>> .desc dd {display:block;float:left;line-height:22.5px}
	.v-calendar__detail >>> .desc dt {clear:both;width:60px;text-align:justify}
	.v-calendar__detail >>> .desc dd {padding-left:20px;border-left:1px dashed #eee}
	.group {clear:both;overflow:hidden;margin-bottom:25px}
	.group:first-child {margin-top:10px}
	.group:last-child {margin-bottom:0}
	.group > h2 {margin-bottom:10px;color:#32325d}
	.group > h2 .v-icon {margin-right:3px;vertical-align:-3.5px;color:#32325d}
	.group-user {float:left;width:32%;height:210px;margin:0 0 2% 2%;word-break:break-word;border-radius:.375rem;background-color:#f6f9fc;border:1px solid #e9eff5;box-shadow:0 3px 6px rgba(50,50,93,.04), 0 1px 1px rgba(0,0,0,.03) !important}
	.group-user:nth-child(3n+1) {clear:both;margin-left:0}
	.group-user .btn_more {position:absolute;top:-1.65rem;right:1rem;min-width:40px;width:40px;height:40px;border-radius:20%;background:linear-gradient(50deg,#6f68e4 0,#2dcecc 100%) !important;box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08) !important}
	.group-user .btn_more >>> .v-icon {line-height:18px}
	.group > h3 {float:left;margin-right:15px;font-size:1.7rem;font-weight:bold;color:#6b6ae4}
	.group > p {position:relative;font-size:0.9rem;color:#525f7f}
	.group > p.txt_count {float:left;margin-bottom:20px}
	.group > h3, .group > p {line-height:28px}
	.group > p:after {display:block;content:'';clear:both}
	.group .count {color:#f5365c;font-weight:bold}
</style>
