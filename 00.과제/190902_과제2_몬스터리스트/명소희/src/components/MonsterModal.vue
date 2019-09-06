<template>
	<div v-if="monster.name" class="modal">
		<ul class="tab">
			<li v-for="tab in tabs" :key="tab" :class="{ 'active': activeTab == tab }"><button type="button" @click="switchTab(tab)">{{tab}}</button></li>
		</ul>
		<div v-show="activeTab == 'info'" class="tab_cont">
			<dl>
				<dt><strong>이름</strong></dt>
				<dd>{{ monster.name }}</dd>
				<dt><strong>나이</strong></dt>
				<dd>{{ monster.age }}</dd>
				<dt><strong>설명</strong></dt>
				<dd>{{ monster.desc }}</dd>
			</dl>
		</div>
		<div v-show="activeTab == 'hit'" class="tab_cont">
			<div class="hitArea">
				<p class="gauge"><span v-text="monster.hp" :style="{width : `${hpPercentage}%`}" class="default" :class="{green: monster.hp <= 30}"></span></p>
				<p><button type="button" @click="hitMonster">때리기</button></p>

				<img :src="imgPath">

				<p>{{monster.isDied ? '죽었다' : '안죽었다'}}</p>
			</div>
		</div>
		<p class="btn close" @click="modalClose"><button type="button">닫기</button></p>

	</div>

</template>

<script>
export default {
	props: ['monster'],
	data: () => ({
		activeTab: null,
		tabs : ['info', 'hit', 'share']
	}),
	mounted() {
		this.activeTab = this.tabs[0]
	},
	computed: {
		imgPath() {
			let suffix = (this.monster.isDied) ? 'after.png' : 'before.png'

			// src/assets에 있는 이미지 바인딩을 위해 require 또는 import 구문으로 이미지를 불러옵니다.
			// 해당 모듈(여기서는 이미지 파일)이 폴더에 있는지 확인하기 위해 try/catch 구문을 사용합니다.
			// 모듈이 있으면 try 블록 안 구문을 실행, 없으면 catch(e) 블록 안 구문을 실행합니다.
			try {
				return require(`@/assets/${this.monster.imgName}_${suffix}`)
			} catch(e) {
				// 만약 src/views/Monster.vue의 monsters 배열에 있는 이미지 정보를 찾지 못하면, catch(e) 블록 구문을 실행하여 기본 이미지(여기서는 src/assets/after.png 또는 src/assets/before.png)를 반환합니다.
				return require(`@/assets/${suffix}`)
			}
		},
		hpPercentage() {
			return this.monster.hp / this.monster.fullHp * 100
		}
	},
	methods: {
		switchTab(tabName) {
			this.activeTab = tabName
		},
		hitMonster() {
			if (!this.monster.isDied) {
				this.monster.hp -= 10
				if (this.monster.hp <= 0) {
					this.monster.isDied = true
				}
			}
		},
		modalClose() {
			this.$emit('close')
		}
	}
}
</script>

<style scoped>
	.modal {z-index:100; margin:-250px 0 0 -250px; position:absolute; left: 50%; top: 50%; width :500px; height:500px; background:#fff; border:1px solid #ccc;}
	.tab {overflow: hidden; width: 100%;}
	.tab li {float: left; width: 50%; height: 50px; }
	.tab li button {width: 100%; height: 100%; display: block;}
	dl {display:block}
	.gauge {width:90%; height:30px; background:#ccc;}
	.gauge span {display:block; width:100%; height:100%; background:#ee4d4d; transition:all 0.3s;}
	.gauge span.green {background:#82e995}

	.close {position: absolute; right: 0; top: -50px; width: 50px; height: 50px; background:#ccc;}
	.close button {width: 100%; height: 100%; display: block; text-indent: -9999px;}
</style>