<template>
	<span style="width:235px;" class="selectbox_wrap" :class="{ 'active': isListActive }" v-if="selectBoxList">
		<a href="#" class="select_result" title="검색 조건 선택" style="width: 194px;" @click.prevent="toggleBox">
			다른 회차 선택하기
			<span class="ico-select"></span>
		</a>
		<ul class="sel_list">
			<!-- <li v-for="item in selectBoxList" :key="item.times" :class="{ 'on': currentTimes === item.times }">
				<a href="#" @click.prevent="changeTimes(item.times)">{{ item.times }}회</a>
			</li> -->

			<!--
				// PageTab.vue와 마찬가지로 탭 클릭 시 브라우저 URL을 변경하기 위해 vue-router의 router-link를 적용
				// router-link를 적용하면 changeTimes 부모로 $emit 처리하지 않아도 됨
				// 마찬가지로 active class도 현재 route에 따라 설정되므로 selectBoxList만 남게 됨
				// ex) 55회 클릭 -> http://BASE_URL/winner/54
				// ex) 54회 클릭 -> http://BASE_URL/winner/53

				// 회차를 클릭하면 SelectBox를 닫는데, 단순 class off 상태 변경이므로 <a>에 isListActive = false 처리 click 이벤트를 바로 바인딩
			-->
			<router-link v-for="item in selectBoxList"
				tag="li"
				:key="item.times"
				:to="{ name: 'winner_times', params: { times: item.times } }">
				<a @click="isListActive = false">{{ item.times }}회</a>
			</router-link>
		</ul>
	</span>
</template>

<script>
export default {
	props: [ 'selectBoxList' ],
	data: () => ({
		isListActive: false 
	}),
	methods: {
		toggleBox() {
			this.isListActive = !this.isListActive
		}
	}
}

</script>