<template>
	<div>
		{{ id + 1 }}번 몬스터 자세히 보기

		<ul class="tab">
			<li v-for="(tab, idx) in $store.state.tabs" :key="tab" :class="{ 'active': $store.state.activeTab == idx }"><button type="button" @click="switchTab(idx)">{{ tab }}</button></li>
		</ul>
		<div v-show="$store.state.activeTab === 0" class="tab_cont">
			<p>{{$store.state.monster.name}}</p>
			<dl>
				<dt><strong>나이</strong></dt>
				<dd>{{ $store.state.monster.age }}</dd>
				<dt><strong>설명</strong></dt>
				<dd>{{ $store.state.monster.desc }}</dd>
				<dt><strong>상태</strong></dt>
				<dd>{{ $store.state.monster.status.died ? '죽었다' : '안죽었다' }}</dd>
			</dl>
		</div>
		<div v-show="$store.state.activeTab === 1" class="tab_cont">
			<div class="bar">
				<div></div>
				<el-progress :text-inside="true" :stroke-width="26" :percentage="hp" :color="$store.state.colors"></el-progress>
			</div>
			<img :src="imgPath" :alt="$store.state.monster.name">
			<el-button type="primary" round :disabled="$store.state.monster.status.died" @click="hitMonster">{{$store.state.monster.name}} 때리기</el-button>
			<p>{{ $store.state.monster.status.died ? '죽었다' : '안죽었다' }}</p>
		</div>
		<p><button type="button" @click="removeMonster">삭제하기</button></p>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
	props: [ 'id' ],
	watch: {
		$router: {
			immediate: true,
			handler(to, from) {
				this.fetchData()
			}
		}
	},
	computed: {
		...mapGetters([
			'hp','imgPath'
		])
	},
	methods: {
		...mapActions([
			'switchTab', 'hitMonster'
		]),
		fetchData() {
			console.log(`${this.id + 1}번 몬스터 데이터 호출`)
			this.$store.state.monster = this.$store.state.monsters[this.id]

		},
		removeMonster() {
			if (confirm('삭제하시겠습니까?')) {
				this.$store.dispatch('removeMonster', this.id)
				alert(`${this.id + 1}번 몬스터 ${this.$store.state.monster.name}님을 삭제했습니다.`)
				setTimeout(() => {
					this.$router.push({ name: 'monster' })
				}, 300)
			}
		}
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
