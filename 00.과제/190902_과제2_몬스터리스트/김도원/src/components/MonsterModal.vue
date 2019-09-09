<template>
	<div v-if="monster.name">
		<div class="bg_modal">
		</div>
		<div class="modal">
			<ul>
				<li v-for="(tab, index) in tabs" :key="tab.name" @click="tabClick(index)"><button>{{tab.name}}</button></li>
			</ul>
			 <div class="tab_con">
				<div v-show='currentTab === 0'> 
					<p>{{monster.name}}</p>
					<dl>
						<dt><strong>나이</strong></dt>
						<dd>{{ monster.age }}</dd>
						<dt><strong>설명</strong></dt>
						<dd>{{ monster.desc }}</dd>
						<dt><strong>상태</strong></dt>
						<dd>{{ monster.status.died }}</dd>
					</dl>		
				</div>
				<div v-show='currentTab === 1'>
					<div class="bar">
						<div></div>
						<el-progress :text-inside="true" :stroke-width="26" :percentage="hp"></el-progress>
					</div>
					<img :src="imgPath" :alt="monster.name">
					<p>{{monster.status.died ? '죽었다' : '안죽었다'}}</p>
					<el-button type="primary" round :disabled="monster.status.died" @click="hitMonster">{{monster.name}} 때리기</el-button>
				</div>
			 </div>	
			<button class="btn_close" @click="closeModal">모달 닫기</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['monster'],
	data: () => ({
		tabShowing: false,
		tabs: [
			{ name: '몬스터 정보' },
			{ name: '몬스터 때리기' }
		],
		currentTab: null
	}),
	mounted() {
		this.currentTab = 1
	},
	computed: {
		hp() {
			return this.monster.hp / this.monster.fullHp * 100
		},
		imgPath(){
			let status = (this.monster.status.died) ? '_after.jpg' : '_before.jpg'
			
			try {
				return require(`@/assets/${this.monster.imgPath}${status}`)
			} catch(err) {
				return require(`@/assets/default.png`)
			}
		}
	},
	methods: {
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
		tabClick(idx) {
			this.currentTab = idx
		},
		closeModal() {
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
	.tab_con img { width: 400px; height: 400px }
</style>
