<template>
	<div class="Homework">
		<p class="gauge"><span v-text="hp" v-bind:style="{width : width + '%'}"></span></p>
		<p><button type="button" @click="test">때리기</button></button></p>
		<img :src="afterImage" class="after" v-if="isDied">
		<img :src="beforeImage" class="before" v-else>
		<p v-if="isDied">죽었다</p>
		<p v-else>안죽었다</p>
	</div>
</template>

<script>
export default {
	name: 'monster',
	hp : 100,
	data() {
		return{
			title: '111',
			beforeImage : require('../assets/before.png'),
			afterImage : require('../assets/after.png'),
			hp : 100,
			isDied : false,
			width : 100
		}
	},
	methods: {
		test : function(){
			

			if(this.hp <= 0){
				this.isDied = true
				this.hp = 0;
			}else{
				this.hp = this.hp - 10;
				this.width = this.width -10;
			}
			
		}
	}


}
</script>

<style scoped>
	.gauge {width:50%; height:30px; background:#ccc;}
	.gauge span {display:block; width:100%; height:100%; background:#ee4d4d}
</style>
