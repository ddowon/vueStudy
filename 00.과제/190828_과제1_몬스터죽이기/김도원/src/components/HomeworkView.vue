<template>
	<div>
		<div>야생의 {{name}}</div>
		<div>HP : {{hp}}</div>
		<div class="bar">
			<el-progress :text-inside="true" :stroke-width="26" :percentage="hp"></el-progress>
		</div>
		<el-button type="primary" round @click="hitMontster">때리기</el-button>
		<div v-if="isDied">
			<img src="@/assets/cookie_2.jpg" alt="">
			<p>{{name}}가 {{txt1}}</p>
			<el-button type="danger" round @click="hpReset">쿠키몬스터 살리기</el-button>
		</div>
		<div v-else>
			<img src="@/assets/cookie_1.jpg" alt="">
			<p>{{name}}가 {{txt2}}</p>
			<el-button type="danger" round disabled>쿠키몬스터 살리기</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data : () => ({
		name: "쿠키몬스터",
		hp: 100,		
		isDied : false,
		txt1 : "죽고 말았습니다...아아아 ㅜㅜㅜ",
		txt2 : "아직 살아있어요 뿌샤뿌샤"
	}),
	methods : {
		hitMontster(){			
			if( this.hp > 0 && !this.isDied ){
				this.hp -= 10
				if( this.hp === 0){
					this.isDied = true;
				}
			}
		},
		hpReset(){			
			this.hp = 100;
			this.isDied = false;
		}
	}
}
</script>

<style scoped>
	.bar { width: 600px;}
</style>
