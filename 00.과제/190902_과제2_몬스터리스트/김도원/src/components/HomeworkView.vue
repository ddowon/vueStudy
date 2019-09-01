<template>
	<div>
		<div>야생의 {{name}}</div>
		<div>HP : {{hp}}</div>
		<div class="bar">
			<div></div>
			<el-progress :text-inside="true" :stroke-width="26" :percentage="hp"></el-progress>
		</div>
		<el-button type="primary" round :disabled="isDied" @click="hitMonster">{{name}} 때리기</el-button>
		<!-- <div :class="{ active: !isDied }"> -->
		<div class="full" :class="state">
			<img v-if="isDied" src="@/assets/monster.png" :alt="msg">
			<img v-else src="@/assets/monster.png" :alt="msg">
		</div>
		<p>{{name}}가 {{msg}}</p>



	<ul>
		<li v-for="item in basket" :key="item.name">
			{{item.name}} - {{item.num}}
		</li>
	</ul>

		<el-button type="danger" round :disabled="!isDied" @click="hpReset">{{name}} 살리기</el-button>
	</div>
</template>

<script>
export default {
	data: () => ({
		basket: [
			{
				name: '사과',
				num: 3
			},
			{
				name: '배',
				num: 2
			},
			{
				name: '딸기',
				num: 5
			}
		],
		message : "hi?",
		age : '3',
		itemList : [
			{ name : '사과', key: 'red'},
			{ name : '배'},
			{ name : '바나나'},
			{ name : '과자'}
		],
		isShowing : false,
		message1 : "보인다",
		message2 : "안보인다",
	
		monsters: [{
			name: "와조스키",
			hp: 100,
			isDied: false,
			state:{ 
				danger: false,
				died: false
			}
		}]
	}),
	computed: {
		msg() {
			return (!this.isDied) ? "아직 살아있어요 뿌샤뿌샤" : "죽고 말았습니다...아아아ㅜㅜㅜ"
		}
	},
	methods: {
		hitMonster(){
			if (!this.isDied) {
				this.hp -= 10
				if (this.hp <= 0) {
					this.isDied = true;
					this.state.died = true;

				} else if (this.hp <= 30) {
					this.state.danger = true;

				}
			}
		},
		hpReset() {
			this.hp = 100;
			this.isDied = false;
			this.state.danger = false;
			this.state.died = false;
		},
		handleClick(){
			this.message = 'HIHI!'
		},
		sayHi(){

		},
		toggle(){
			this.isShowing = !this.isShowing
		}
	}
}
</script>
<style scoped>
	.bar { width: 600px }
	/* .active { border: 10px solid lightseagreen; background-color: yellow } */
	.full { background-color: #409eff }
	.danger { background-color :#e6a23c }
	.died { background-color :#f56c6c }

</style>
