<template>
	<div class="dim-wrap">
		<!-- 레이어팝업 보임 : on -->
		<div class="dim-con">
			<button type="button" @click="closePop()">
				<img src="http://images.jtbc.joins.com/baeksang/btn_close.png" alt="닫기">
			</button>
			<!-- 동영상 영역 -->
			<div class="replay-area">
				<youtube :video-id="item.src" ref="youtube" :width="1008" :height="567"></youtube>
			</div>
			<!-- //동영상 영역 -->
		</div>
	</div>
</template>

<script>
	export default {
		props: ['isPopShowing', 'item'],
		data: () => ({
		}),
		watch: {
			isPopShowing: {
				handler(newVal, oldVal) {
					if (newVal) {
						setTimeout(() => {
							this.playVideo()
						},300)
					}
				}
			}
		},
		computed: {
			player() {
				return this.$refs.youtube.player
			}
		},
		methods: {
			playVideo() {
				console.log('재생')
				this.player.playVideo()
			},
			stopVideo() {
				console.log('정지')
				this.player.stopVideo()
			},
			closePop(){
				this.$emit('closePop')
				this.stopVideo()
			}

		}
	}

</script>
