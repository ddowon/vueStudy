<template>
	<div class="dday-wrap ani-visible">
		<div class="container-inner">
			<div class="dday">
				<h2>D-day</h2>
				<div class="timer" id="timer-id">
					<span class="day">
						<span class="cnt" id="dday-day">00</span>
						<span class="txt">일</span>
					</span>
					<em id="dday-p1">:</em>
					<span class="hour">
						<span class="cnt" id="dday-hour">01</span>
						<span class="txt">시</span>
					</span>
					<em id="dday-p2">:</em>
					<span class="sec">
						<span class="cnt" id="dday-sec">05</span>
						<span class="txt">분</span>
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
			msg: String
		}
	}

</script>
