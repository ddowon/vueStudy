<template>
	<span style="width:235px;" class="selectbox_wrap" :class="{'active': isListActive}" v-if="selectBoxList">
		<a href="#" class="select_result" title="검색 조건 선택" style="width: 194px;" @click.prevent="listBoxToggle">
			다른 회차 선택하기
			<span class="ico-select"></span>
		</a>
		<ul class="sel_list">
			<li v-for="item in selectBoxList" :key="item.times" :class="{'on': currentTimes === item.times }">
				<a href="#" @click.prevent="changeTimes(item.times)">{{item.times}}회</a>
			</li>
		</ul>
	</span>
</template>

<script>
export default {
	props: ['currentTimes', 'selectBoxList'],
	data:() => ({
		isListActive: false 
	}),
	methods: {
		listBoxToggle() {
			this.isListActive = !this.isListActive
		},
		changeTimes(times) {
			this.listBoxToggle()
			this.$emit('changeTimes', times)
		}
	}
}

</script>