<template>
	<div>
		{{ Number($route.params.id) + 1 }}번 몬스터 자세히 보기
			<ul class="tab">
				<li v-for="(tab, idx) in tabs" :key="tab" :class="{ 'active': activeTab == idx }"><button type="button" @click="switchTab(idx)">{{ tab }}</button></li>
			</ul>
			<div v-show="activeTab === 0" class="tab_cont">
				<p>{{monsters[param].name}}</p>
				<dl>
					<dt><strong>나이</strong></dt>
					<dd>{{ monsters[param].age }}</dd>
					<dt><strong>설명</strong></dt>
					<dd>{{ monsters[param].desc }}</dd>
					<dt><strong>상태</strong></dt>
					<dd>{{ monsters[param].status.died ? '죽었다' : '안죽었다' }}</dd>
				</dl>
			</div>
			<div v-show="activeTab === 1" class="tab_cont">
				<div class="bar">
					<div></div>
					<el-progress :text-inside="true" :stroke-width="26" :percentage="hp"></el-progress>
				</div>

				<img :src="imgPath" :alt="monsters[param].name">

				<el-button type="primary" round :disabled="monsters[param].status.died" @click="hitMonster">{{monsters[param].name}} 때리기</el-button>

				<p>{{ monsters[param].status.died ? '죽었다' : '안죽었다' }}</p>
				
			</div>
			<p><button type="button" @click="removeMonster">삭제하기</button></p>
			
		<!-- n번 몬스터의 정보를 보여주려면 무엇을 어떻게 해야할까요? -->
	</div>
</template>

<script>
import { store, mutations } from '@/store/index'

export default {
	props: ['monster'],
	data: () => ({
		monsters: [],
		activeTab: null,
		tabs: [ '몬스터 정보', '몬스터 때리기' ],
		param : null
	}),
	mounted() {
		this.activeTab = 0;
		this.monsters = store.monsters;
		this.param = this.$route.params.id
	},
	computed: {
		imgPath() {
			let suffix = (this.monsters[this.param].status.died) ? 'after.jpg' : 'before.jpg'

			// src/assets에 있는 이미지 바인딩을 위해 require 또는 import 구문으로 이미지를 불러옵니다.
			// 해당 모듈(여기서는 이미지 파일)이 폴더에 있는지 확인하기 위해 try/catch 구문을 사용합니다.
			// 모듈이 있으면 try 블록 안 구문을 실행, 없으면 catch(e) 블록 안 구문을 실행합니다.
			try {
				return require(`@/assets/${this.monsters[this.param].imgName}_${suffix}`)
			} catch(e) {
				return require(`@/assets/default.png`)
			}
		},
		hp() {
			return this.monsters[this.param].hp / this.monsters[this.param].fullHp * 100
		}
	},
	methods: {
		switchTab(idx) {
			this.activeTab = idx
		},
		hitMonster() {
			if (!this.monsters[this.param].status.died) {
				this.monsters[this.param].hp -= 10
				if (this.monsters[this.param].hp <= 0) {
					this.monsters[this.param].status.died = true
				} else if (this.monsters[this.param].hp <= 30) {
					this.monsters[this.param].status.danger = true
				}
			}
		}, 
		removeMonster(){
			mutations.removeMonster(this.param)
		}
	}
}
</script>
<style scoped>

</style>
