<template>
	<div v-if="monster">
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
				<dd v-if="monster.hp <= 0">죽었다.</dd>
				<dd v-else>안 죽었다.</dd>
			</dl>
		</div>
		<div v-show="activeTab === 1" class="tab_cont">
			<div class="bar">
				<div></div>
				<el-progress :text-inside="true" :stroke-width="26" :percentage="hp" :color="colors"></el-progress>
			</div>
			<img :src="imgPath" :alt="monster.name">
			<el-button type="primary" round :disabled="monster.hp <= 0" @click="hitMonster">{{monster.name}} 때리기</el-button>
			<p v-if="monster.hp <= 0">죽었다.</p>
			<p v-else>안 죽었다.</p>
		</div>
		<p><button type="button" @click="removeData">삭제하기</button></p>
	</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
	props: [ 'id' ],
	created() {
		console.log('created 호출')
	},
	mounted() {
		console.log('mounted 호출')
	},
	watch: {
		$route: {
			handler(to, from) {
				this.fetchData()
			}, immediate: true
		}
	},
	computed: {
		...mapState('monster', [
			'activeTab', 'tabs', 'colors'
		]),
		...mapGetters('monster', [
			'monster', 'imgPath', 'hp'
		])
	},
	methods: {
		...mapActions('monster', [
			'fetchMonster', 'switchTab', 'hitMonster', 'removeMonster'
		]),
		fetchData() {
			this.fetchMonster({
				id: this.id,
				callback: (err) => {
					if (err) {
						console.log(err)
						this.$router.push({ path: '/404' })
					} else {
						console.log(`${this.id + 1}번 몬스터 데이터 호출 성공`)
					}
				}
			})
		},
		removeData() {
			if (confirm(`${this.monster.name}님을 삭제하시겠습니까?`)) {
				this.removeMonster({
					id: this.id, name: this.monster.name,
					callback: (name) => {
						alert(`${this.id + 1}번 몬스터 ${name}님을 삭제했습니다.`)
						this.$router.push({ name: 'monster' })
					}
				})
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
