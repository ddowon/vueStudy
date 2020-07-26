<template>
	<div class="awards-con">
		<WinnerListFeaturedItem
			:featuredWinner="featuredWinner"
			v-if="featuredWinner" />

		<!-- // Winner.vue에서 v-if="item.winners.length" 처리를 했으므로 v-if 디렉티브 제거 -->
		<div class="awards-awarded">
			<ul class="awarded-list" >
				<li v-for="item in filteredWinnerList" :key="item.PROGRAM_NM">
					<span class="list-thumb"><img :src="item.PHOTO_URI" alt=""></span>
					<span class="title">
						<strong class="title-prize">{{ item.PRIZE_NM }}</strong>
						<em v-html="item.NAME"></em>
						<span class="name">{{ item.PROGRAM_NM }}</span>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import WinnerListFeaturedItem from '@/components/winner/WinnerListFeaturedItem.vue'

export default {
	props: [ 'winnerList' ],
	components: {
		WinnerListFeaturedItem
	},
	computed: {
		// Winner.vue의 computed에서 반복 처리하던 부분을 리팩토링
		// Winner.vue의 v-for 디렐티브를 통해 부문별 winners 배열을 WinnerList.vue에 전달하므로 좀 더 효율적인 설계 가능
		// FeatureWinner 컴포넌트를 WinnerList.vue 안에서 불러들여 대상을 기준으로 코드 정리
		featuredWinner() {
			return this.winnerList.find((item) => {
				return item.PRIZE_NM.includes('대상')
			})
		},
		filteredWinnerList() {
			return this.winnerList.filter((item) => {
				return !item.PRIZE_NM.includes('대상')
			})
		}
	}
}
</script>