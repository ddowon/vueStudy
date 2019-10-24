<template>
	<div>
		{{ id + 1 }}번 몬스터 자세히 보기

		<ul class="tab">
			<li v-for="(tab, idx) in tabs" :key="tab" :class="{ 'active': activeTab == idx }"><button type="button" @click="switchTab(idx)">{{ tab }}</button></li>
		</ul>
		<div v-show="activeTab === 0" class="tab_cont">
			<p>{{monster.name}}</p>
			<dl>
				<dt><strong>나이</strong></dt>
				<dd>{{ monster.age }}</dd>
				<dt><strong>설명</strong></dt>
				<dd>{{ monster.desc }}</dd>
				<dt><strong>상태</strong></dt>
				<dd>{{ monster.status.died ? '죽었다' : '안죽었다' }}</dd>
			</dl>
		</div>
		<div v-show="activeTab === 1" class="tab_cont">
			<div class="bar">
				<div></div>
				<el-progress :class="{sick: monster.status.sick, danger: monster.status.danger}" :text-inside="true" :stroke-width="26" :percentage="hp" :color="colors"></el-progress>
			</div>
			<img :src="imgPath" :alt="monster.name">
			<el-button type="primary" round :disabled="monster.status.died" @click="hitMonster">{{monster.name}} 때리기</el-button>
			<p>{{ monster.status.died ? '죽었다' : '안죽었다' }}</p>
		</div>
		<p><button type="button" @click="removeMonster({id: id, name: monster.name})">삭제하기</button></p>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
	props: [ 'id' ],
	created() {
		// 뷰 인스턴스가 생성되고 this에 접근할 수 있는 상태에서 데이터를 가져옵니다.
		this.fetchData()
		console.log('created 호출')
	},
	watch: {
		// Vue-Router hash 모드에서 라우트가 변경되면 URL의 params.id 값을 다시 감지해 새로운 데이터를 가져옵니다.
		$route(to, from) {
			this.fetchData()
		}
	},
	computed: {
		...mapState([
			'activeTab', 'tabs', 'colors'
		]),
		...mapGetters([
			'monster', 'imgPath', 'hp'
		])

	},
	methods: {
		...mapMutations([
			'switchTab', 'hitMonster'
			]),
		...mapActions([
			'removeMonster'
			]),
		fetchData() {
			// @/views/monster/View.vue (<MonsterView :id="Number(id)" />)에서 전달받은 params.id 값을 바탕으로 @/store/monsters.js 내부 몬스터 데이터를 가져옵니다.
			console.log(`${this.id + 1}번 몬스터 데이터 호출`)
			this.$store.dispatch('getMonster', this.id)
		},



	}
}
</script>
<style scoped>
	.tab {overflow: hidden; width: 100%;}
	.tab li {float: left; width: 50%; height: 50px; }
	.tab li button {width: 100%; height: 100%; display: block; }
	dl {display:block}
	.tab_cont img { display: block; max-height: 400px; }
</style>
