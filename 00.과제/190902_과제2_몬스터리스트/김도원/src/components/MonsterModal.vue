<template>
	<div v-if="isShowing">
		<div class="bg_modal">
		</div>
		<div class="modal">
			<div class="contents"> 
				<p>{{selectedMonster.name}}</p>
				<div class="bar">
					<div></div>
					<el-progress :text-inside="true" :stroke-width="26" :percentage="(selectedMonster.hp/selectedMonster.fullHp)*100"></el-progress>
				</div>
				<el-button type="primary" round :disabled="selectedMonster.state.died" @click="hitMonster(selectedMonster)">{{selectedMonster.name}} 때리기</el-button>
			</div>
			<button class="btn_close" @click="closeModal">모달 닫기</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['monsters', 'isShowing', 'selectedMonster'],
	data: () => ({

	}),
	mounted () {

	},
	methods: {
		hitMonster(monster){

			if (!monster.state.died) {
				monster.hp -= 10
				if (monster.hp <= 0) {
					monster.state.died = true;

				} else if (monster.hp <= 30) {
					monster.state.danger = true;

				}
			}
		},
		closeModal () {
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
