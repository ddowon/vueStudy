<template>
	<div v-if="monster.name">
		<div class="bg_modal">
		</div>
		<div class="modal">
			<div class="contents"> 
				<p>{{monster.name}}</p>
				<dl>
					<dt><strong>나이</strong></dt>
					<dd>{{ monster.age }}</dd>
					<dt><strong>설명</strong></dt>
					<dd>{{ monster.desc }}</dd>
					<dt><strong>상태</strong></dt>
					<dd>{{ monster.state.died }}</dd>
				</dl>
				<div class="bar">
					<div></div>
					<el-progress :text-inside="true" :stroke-width="26" :percentage="hp"></el-progress>
				</div>
				<el-button type="primary" round :disabled="monster.state.died" @click="hitMonster">{{monster.name}} 때리기</el-button>
			</div>
			<button class="btn_close" @click="closeModal">모달 닫기</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['monster'],
	data: () => ({

	}),
	mounted() {

	},
	computed: {
		hp() {
			return this.monster.hp / this.monster.fullHp * 100
		}
	},
	methods: {
		hitMonster() {
			if (!this.monster.state.died) {
				this.monster.hp -= 10
				if (this.monster.hp <= 0) {
					this.monster.state.died = true
				} else if (this.monster.hp <= 30) {
					this.monster.state.danger = true
				}
			}
		},
		closeModal() {
			this.$emit('closeModal')
		}
	}
}
</script>
<style scoped>
	.bg_modal { z-index: 10; position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5)}
	.modal { z-index: 10; position: fixed; top: 50%; left: 50%; margin: -300px 0 0 -300px; width: 600px; height: 600px; background: white; border-radius: 50px; }
	.modal .contents { margin: 50px; }
	.modal .btn_close { position: absolute; top: 30px; right: 30px; width: 50px; height: 50px; background: transparent; border: none; cursor: pointer; }
</style>
