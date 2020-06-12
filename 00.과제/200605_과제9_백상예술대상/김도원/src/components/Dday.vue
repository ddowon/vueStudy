<template>
	<div class="dday-wrap ani-visible">
		<div class="container-inner">
			<div class="dday">
				<h2>D-day</h2>
				<div class="timer" id="timer-id">
					<span class="day">
						<span class="cnt" id="dday-day">{{day}}</span>
						<span class="txt">일</span>
					</span>
					<em id="dday-p1">:</em>
					<span class="hour">
						<span class="cnt" id="dday-hour">{{hour}}</span>
						<span class="txt">시</span>
					</span>
					<em id="dday-p2">:</em>
					<span class="min">
						<span class="cnt" id="dday-min">{{minutes}}</span>
						<span class="txt">분</span>
					</span>
					<em id="dday-p3">:</em>
					<span class="sec">
						<span class="cnt" id="dday-sec">{{seconds}}</span>
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
			countDownDate() {
				return new Date(this.dday).getTime()
			},
			distance() {
				return this.countDownDate - this.today
			},
			day() {
				let d = String(Math.floor(this.distance / (1000 * 60 * 60 * 24)))
				d.length === 1 ? `0${d}` : d
				return d
			},
			hour() {
				let h = String(Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
				h.length === 1 ? `0${h}` : h
				return h
			},
			minutes() {
				let m = String(Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)))
				m.length === 1 ? `0${m}` : m
				return m
			},
			seconds() {
				let s = String(Math.floor((this.distance % (1000 * 60)) / 1000))
				s.length === 1 ? `0${s}` : s
				return s
			}			
		},
		mounted(){
			this.dDayCount()
		},
		methods: {
			dDayCount(){
				setInterval(() => {
					this.today =  new Date().getTime()

				},1000)
			}
		}
	}

</script>
