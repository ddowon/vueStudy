<template>
	<div v-if="monster.name" class="modal">
		<ul class="tab">
			<li v-for="tab in tabs"><button type="button" @click="tabFunc(tab)">{{tab}}</button></li>
		</ul>
		<dl v-show="isShow">
			<dt><strong>이름</strong></dt>
			<dd>{{ monster.name }}</dd>
			<dt><strong>나이</strong></dt>
			<dd>{{ monster.age }}</dd>
			<dt><strong>설명</strong></dt>
			<dd>{{ monster.desc }}</dd>
		</dl>
		<div class="hitArea" v-show="!isShow">
			<p class="gauge"><span v-text="monster.hp" :style="{width : monster.hp + '%'}" class="default" :class="{green: monster.hp <= 30}"></span></p>
			<p><button type="button" @click="hitFunc(monster)">때리기</button></button></p>
			<img :src="monster.afterImage" class="after" v-if="!monster.hp">
			<img :src="monster.beforeImage" class="before" v-else>
			<p>{{monster.hp ? '안죽었다' : '죽었다'}}</p>
		</div>
		<p class="btn close" @click="modalClose"><button type="button">닫기</button></p>

	</div>

</template>

<script>
export default {
	props: ['monster'],
	data: () => ({
		isShow : true,
		tabs : ['info', 'hit']
	}),
	methods: {
		tabFunc(type){
			console.log(type)
			if(type == "info"){
				this.isShow = true
			}else{
				this.isShow = false
			}
		},
		hitFunc(target){
			if(target.hp == 0){
				target.isDied = true
				target.hp = 0;
				target.stateTxt = '죽었다';
				console.log(target)
			}else if(target.hp == 30){
				target.isChange = true;
				target.hp = target.hp - 10;
				target.width = target.width -10;
			}else{
				target.hp = target.hp - 10;
				target.width = target.width -10;
			}
		},
		modalClose() {
			this.isShow = true;
			this.$emit('close')
		}
	}
}
</script>

<style scoped>
	.modal {z-index:100; margin:-250px 0 0 -250px; position:absolute; left: 50%; top: 50%; width :500px; height:500px; background:#fff; border:1px solid #ccc;}
	.tab {width: 100%;}
	.tab li {float: left; width: 50%; height: 30px; }
	.tab li button {width: 100%; height: 100%; display: block;}
	dl {z-index: 10; position: absolute; top: 30px; left: 0; }
	.hitArea {z-index: 10; position: absolute; top: 30px; left: 0; width: 100%;}
	.gauge {width:90%; height:30px; background:#ccc;}
	.gauge span {display:block; width:100%; height:100%; background:#ee4d4d; transition:all 0.3s;}
	.gauge span.green {background:#82e995}

	.close {position: absolute; right: 0; top: 0; width: 50px; height: 50px; background:#ccc;}
	.close button {width: 100%; height: 100%; display: block; text-indent: -9999px;}
</style>