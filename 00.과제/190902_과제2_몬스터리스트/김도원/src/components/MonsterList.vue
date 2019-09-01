<template>
	<div>
		<ul>
			<li v-for="monster in monsters" :key="monster.name">
				<div>야생의 {{monster.name}}</div>
				<div>HP : {{monster.hp}}</div>
				<div class="bar">
					<div></div>
					<el-progress :text-inside="true" :stroke-width="26" :percentage="(monster.hp/monster.fullHp)*100"></el-progress>
				</div>
				<el-button type="primary" round :disabled="monster.isDied" @click="hitMonster(monster)">{{monster.name}} 때리기</el-button>
			
				<div class="full">
					<img v-if="monster.isDied" src="@/assets/cookie_2.jpg" alt="msg">
					<img v-else src="@/assets/cookie_1.jpg" alt="msg">
				</div>
				
				<p>{{monster.name}}가</p>
				<button @click='showMonster(monster)'>{{monster.name}} 자세히보기</button>
				<el-divider></el-divider>
			</li>
		</ul>	
		<button @click="addMonster">몬스터 추가하기</button>
	</div>
</template>

<script>
export default {
	
	props: ['monsters'],

	data: () => ({
		isDied : false
	}),
	computed: {
		msg() {
			return (!monster.isDied) ? "아직 살아있어요 뿌샤뿌샤" : "죽고 말았습니다...아아아ㅜㅜㅜ"
		}
	},
	methods: {
		hitMonster(monster){

			if (!monster.isDied) {
				monster.hp -= 10
				if (monster.hp <= 0) {
					monster.isDied = true;
					monster.state.died = true;

				} else if (monster.hp <= 30) {
					monster.state.danger = true;

				}
			}
		},
		showMonster (monster) {

			this.$emit('showMonster', monster)
			
		},
		addMonster () {

			this.monsters.push( {name : '새몬스터', fullHp: 100, hp: 100, desc: '새몬스터 설명', isDied: false, state: { danger: false, died: false } } )
		}
	}

}
</script>
<style scoped>
	.bar { width: 600px }
</style>
