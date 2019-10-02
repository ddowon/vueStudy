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
		<p><button type="button" @click="removeMonster">삭제하기</button></p>
	</div>
</template>

<script>
import { store, mutations } from '@/store/index'

export default {
	props: [ 'id' ],
	data: () => ({
		monster: {},
		activeTab: null,
		tabs: [ '몬스터 정보', '몬스터 때리기' ],
		colors: [
			{ color: '#f56c6c', percentage: 20 },
			{ color: '#e6a23c', percentage: 40 },
			{ color: '#6f7ad3', percentage: 100 }
		]
	}),
	created() {
		// 뷰 인스턴스가 생성되고 this에 접근할 수 있는 상태에서 데이터를 가져옵니다.
		this.fetchData()
		console.log('created 호출')
	},
	mounted() {
		this.activeTab = 0
		console.log('mounted 호출')
	},
	watch: {
		// Vue-Router hash 모드에서 라우트가 변경되면 URL의 params.id 값을 다시 감지해 새로운 데이터를 가져옵니다.
		$route(to, from) {
			this.fetchData()
		}
	},
	computed: {
		imgPath() {
			let suffix = (this.monster.status.died) ? 'after.jpg' : 'before.jpg'

			// src/assets에 있는 이미지 바인딩을 위해 require 또는 import 구문으로 이미지를 불러옵니다.
			// 해당 모듈(여기서는 이미지 파일)이 폴더에 있는지 확인하기 위해 try/catch 구문을 사용합니다.
			// 모듈이 있으면 try 블록 안 구문을 실행, 없으면 catch(e) 블록 안 구문을 실행합니다.
			try {
				return require(`@/assets/${this.monster.imgName}_${suffix}`)
			} catch(e) {
				return require(`@/assets/default.png`)
			}
		},
		hp() {
			return this.monster.hp / this.monster.fullHp * 100
		}
	},
	methods: {
		switchTab(idx) {
			this.activeTab = idx
		},
		fetchData() {
			// @/views/monster/View.vue (<MonsterView :id="Number(id)" />)에서 전달받은 params.id 값을 바탕으로 @/store/monsters.js 내부 몬스터 데이터를 가져옵니다.
			console.log(`${this.id + 1}번 몬스터 데이터 호출`)
			this.monster = store.monsters[this.id]
		},
		hitMonster() {
			if (!this.monster.status.died) {
				this.monster.hp -= 10
				if (this.monster.hp <= 0) {
					this.monster.status.died = true
				} else if (this.monster.hp <= 30) {
					this.monster.status.danger = true
				}
			}
		}, 
		removeMonster() {
			if (confirm('삭제하시겠습니까?')) {
				mutations.removeMonster(this.id)
				alert(`${this.id + 1}번 몬스터 ${this.monster.name}님을 삭제했습니다.`)
				/*
					Vue-Router의 프로그래밍 방식 네비게이션을 사용합니다.
					@/router.js의 라우트 객체 name값을 전달하거나 n단계만큼 뒤로 또는 앞으로 갈 수 있습니다.
					ex) this.$router.push('/')
					ex) this.$router.push({ path: '/monster' })
					ex) this.$router.push({ name: 'monsterView', params: { id: 10 } })
					ex) this.$router.push({ path: 'register', query: { plan: 'private' }})
					ex) this.$router.go(-1)
					this.$router.push({ name: 'home' })
				*/

				/*
					화살표 함수와 this와의 관계를 생각해보세요. 무엇이 다를까요?
					setTimeout(function () {
						this.$router.push({ name: 'monster' })
					}.bind(this), 300)

					let vm = this
					setTimeout(function () {
						vm.$router.push({ name: 'monster' })
					}, 300)
				*/
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
