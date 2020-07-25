<template>
	<div class="dday-wrap ani-visible" v-if="distance > 0">
		<div class="container-inner">
			<div class="dday">
				<h2>D-day</h2>
				<div class="timer">
					<span class="day">
						<span class="cnt">{{ day }}</span>
						<span class="txt">일</span>
					</span>
					<em>:</em>
					<span class="hour">
						<span class="cnt">{{ hour }}</span>
						<span class="txt">시</span>
					</span>
					<em>:</em>
					<span class="min">
						<span class="cnt">{{ minutes }}</span>
						<span class="txt">분</span>
					</span>
					<em>:</em>
					<span class="sec">
						<span class="cnt">{{ seconds }}</span>
						<span class="txt">초</span>
					</span>
				</div><!-- .timer -->
			</div><!-- .dday -->
		</div><!-- .container-inner -->
	</div><!-- .dday-wrap -->
</template>

<script>
export default {
	name: 'dday',
	props: {
		dday: String
	},
	data: () => ({
		today: new Date().getTime(),
	}),
	computed: {
		distance() {
			return new Date(this.dday).getTime() - this.today
		},
		day() {
			let d = Math.floor(this.distance / (1000 * 60 * 60 * 24))
			return d < 10 ? `0${d}` : d
		},
		hour() {
			let h = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			return h < 10 ? `0${h}` : h
		},
		minutes() {
			let m = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60))
			return m < 10 ? `0${m}` : m
		},
		seconds() {
			let s = Math.floor((this.distance % (1000 * 60)) / 1000)
			return s < 10 ? `0${s}` : s
		}
	},
	mounted() {
		this.dDayCount()
	},
	methods: {
		dDayCount() {
			setInterval(() => {
				this.today = new Date().getTime()
			}, 1000)
		}
	}
}
</script>