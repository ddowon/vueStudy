<template>
	<div v-if="monster.name">
		<div class="bg_modal" @click="closeModal"></div>
		<div class="modal">
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
					<el-progress :text-inside="true" :stroke-width="26" :percentage="hp"></el-progress>
				</div>

				<img :src="imgPath" :alt="monster.name">

				<el-button type="primary" round :disabled="monster.status.died" @click="hitMonster">{{monster.name}} 때리기</el-button>

				<p>{{ monster.status.died ? '죽었다' : '안죽었다' }}</p>
			</div>
			<button class="btn_close" @click="closeModal">모달 닫기</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['monster'],
	data: () => ({
		activeTab: null,
		tabs: [ '몬스터 정보', '몬스터 때리기' ]
	}),
	mounted() {
		this.activeTab = 0
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
				} else if (this.monster.hp <= 30) {
					this.monster.status.danger = true
				}
			}
		},
		closeModal() {
			this.activeTab = 0
			this.$emit('closeModal')
		}
	}
}
</script>
<style scoped>
	.bg_modal { z-index: 10; position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5)}
	.modal { z-index: 10; position: fixed; top: 50%; left: 50%; margin: -300px 0 0 -300px; padding: 50px; width: 600px; height: 600px; background: white; border-radius: 50px; box-sizing: border-box}
	.modal .contents { margin: 50px; }
	.modal .btn_close { position: absolute; top: 30px; right: 30px; width: 50px; height: 50px; background: transparent; border: none; cursor: pointer; }
	.tab {overflow: hidden; width: 100%;}
	.tab li {float: left; width: 50%; height: 50px; }
	.tab li button {width: 100%; height: 100%; display: block;}
	dl {display:block}
	.tab_cont img { display: block; max-height: 400px; }
</style>
