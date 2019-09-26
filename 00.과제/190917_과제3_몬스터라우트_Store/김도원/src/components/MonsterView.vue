<template>
	<div>
		{{ Number($route.params.id) + 1 }}번 몬스터 자세히 보기

		<!-- n번 몬스터의 정보를 보여주려면 무엇을 어떻게 해야할까요? -->

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

	</div>
</template>

<script>
import { store, mutations } from '@/store/index'
export default {
	data: () => ({
		monster: [],
		activeTab: null,
		tabs: [ '몬스터 정보', '몬스터 때리기' ],
		 colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
		  {color: '#6f7ad3', percentage: 100}
        ]
	}),
	mounted() {
		this.activeTab = 0,
		this.monster = store.monsters[Number(this.$route.params.id)]
	},
	watch: {
		$route(to, from){
			this.monster = store.monsters[Number(this.$route.params.id)]
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
		hitMonster() {
			if (!this.monster.status.died) {
				this.monster.hp -= 10
				if (this.monster.hp <= 0) {
					this.monster.status.died = true
				} else if (this.monster.hp <= 20) {
					this.monster.status.danter = true
				} else if (this.monster.hp <= 40) {
					this.monster.status.sick = true
				}
			}
		}

	}
}
</script>
<style scoped>
	.tab {overflow: hidden; width: 100%;}
	.tab li {float: left; width: 50%; height: 50px; }
	.tab li button {width: 100%; height: 100%; display: block;}
	dl {display:block}
	.tab_cont img { display: block; max-height: 400px; }
</style>

