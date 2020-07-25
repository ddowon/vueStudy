<template>
	<div class="nominee-list-wrap">
		<div class="container-inner" v-if="candidateList.length">
			<div class="nominee-award-sector sector-title">
				<strong class="nominee-award">{{ candidateList[0].PRIZE_NM }}</strong>
				<span :class="[ 'nominee-sector', `sector-${currentTab.division}` ]">
					{{ currentTab.title }}
				</span>
			</div>
			<ul class="nominee-list">
				<li v-for="item in candidateList" :key="item.PROGRAM_NM">
					<span class="list-thumb">
						<img :src="item.PHOTO_URI" alt="">
					</span>
					<div class="title"> <strong>{{ item.PROGRAM_NM }}</strong> <span class="name">{{ item.NAME }}</span> </div>
				</li>
			</ul>
		</div><!-- .container-inner -->
	</div><!-- nominee-list-wrap -->
</template>

<script>
export default {
	props: [ 'currentTab', 'currentPrize' ],
	computed: {
		// 아래의 candidateList computed는 추후 Vuex의 getters에서 사용
		// state에서 사용해도 되지만, 어떤 값을 '필터링'해서 return 값이 나오는 경우라면 getters가 더 나은 방법
		candidateList() {
			if (this.currentTab) {
				return this.currentTab.candidates.filter((item) => {
					return item.PRIZE_CD === this.currentPrize
				})
			}
		}
	}
}
</script>