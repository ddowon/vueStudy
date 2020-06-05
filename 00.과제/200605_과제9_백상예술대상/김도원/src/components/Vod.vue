<template>
	<div class="vod-wrap ani-visible">
		<div class="container-inner">
			<div class="wrap">
				<div class="list">
					<VueSlickCarousel v-bind="settings">
						<div class="vod-item" v-for="item in vodItems" :key="item.title">
							<a href="#" @click.prevent="openPop(item)">
								<span class="thumb">
									<span><img :src="`${imgPath}${item.imgFile}`" alt=""></span>
								</span>
								<span class="title">
									<strong>{{ item.title }}</strong><span>[56회 백상예술대상]</span>
								</span>
							</a>
						</div>
					</VueSlickCarousel>
				</div><!-- .list -->
			</div><!-- .wrap -->
			<div class="more">
				<a class="box-btn" href="/replay"><span>영상 더보기</span></a>
			</div><!-- .more -->
			<VodPop v-show="isPopShowing" :item="currentVodItem" :isPopShowing="isPopShowing" @closePop="closePop"/>
		</div><!-- .container-inner -->
	</div><!-- .vod-wrap -->
</template>

<script>
	import VodPop from '@/components/VodPop.vue'
	import VueSlickCarousel from 'vue-slick-carousel'
	import 'vue-slick-carousel/dist/vue-slick-carousel.css'
	export default {
		name: 'vod',
		components: { VodPop, VueSlickCarousel },
		props: {
		},
		data: () => ({
			isPopShowing: false,
			currentVodItem: {},
			imgPath: 'http://fs.jtbc.joins.com/joydata/CP00000001/prog/enter/100sangarts/img/',
			vodItems: [
				{title:'문화캠페인, 전미도 배우 편 - 6월 5일 금요일 오후 4시 50분', imgFile: '20200602_165418_788_1.jpg', src: 'xqFvYsy4wE4'},
				{title:'문화캠페인, 박해수 배우 편 - 6월 5일 금요일 오후 4시 50분', imgFile: '20200605_103518_770_1.jpg', src: 'M7qGVk14GG0'},
				{title:'문화캠페인, 박명훈 배우 편 - 6월 5일 금요일 오후 4시 50분', imgFile: '20200603_103619_215_1.jpg', src: 'lG0Ys-2d4MA'}
			],
			settings: {
				"arrow": true,
				"edgeFriction": 0.35,
				"infinite": false,
				"speed": 500,
				"slidesToShow": 1,
				"slidesToScroll": 1
			}
		}),
		computed: {

		},
		methods: {
			openPop(item){
				this.currentVodItem = item
				this.isPopShowing = true
			},
			closePop(){
				this.isPopShowing = false
			}
		}
	}

</script>
