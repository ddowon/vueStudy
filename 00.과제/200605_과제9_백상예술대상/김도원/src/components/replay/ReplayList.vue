<template>
	<Fragment>
		<div class="replay-list-wrap" v-if="vodList.length">
			<div class="container-inner">
				<ul class="replay-list">
					<li v-for="item in vodList" :key="item.title">
						<a href="#" @click.prevent="openPop(item.VOD_FILE_ID)">
							<span class="list-thumb" :data-vod="item.VOD_FILE_ID">
								<img :src="`${item.IMG_FILE_URL}`" :alt="item.VOD_FILE_ID">
								<span class="list-thumb-over">
									<img src="http://images.jtbc.joins.com/baeksang/list_thumb_over_default.png" alt="">
								</span>
								<span class="play-time">{{ item.PLAY_TIME }}</span>
							</span>
							<span class="list-title">{{ item.VOD_TITLE }}</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<VodPop v-show="isPopShowing" :item="currentVodItem" :isPopShowing="isPopShowing" @closePop="closePop" />
	</Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

import VodPop from '@/components/VodPop.vue'

export default {
	components: {
		Fragment, VodPop
	},
	props: [ 'vodList' ],
	data: () => ({
		isPopShowing: false,
		currentVodItem: { 'src': '' }
	}),
	methods: {
		openPop(item) {
			this.currentVodItem.src = item
			this.isPopShowing = true
		},
		closePop() {
			this.isPopShowing = false
		}
	}
}
</script>