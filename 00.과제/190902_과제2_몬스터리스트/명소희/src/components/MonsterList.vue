<template>
	<div>
		<ul>
			<!-- monster.name이 겹치지 않는다는 가정 하에 v-bind:key를 monster.name으로 설정합니다. -->
			<li v-for="(monster, index) in monsters" :key="monster.name">
				<!-- monster 배열을 0번부터 순환하므로 index에 1을 더해줍니다. -->
				<h2>{{ index + 1 }}번 몬스터 - {{ monster.name }}</h2>
				<p>{{monster.isDied ? '죽었다' : '안죽었다'}}</p>
				<p><button @click="viewMonsterInfo(monster)">{{ monster.name }} 자세히 보기</button></p>
			</li>
		</ul>

		<el-divider></el-divider>
		<!-- 자식에서 부모 데이터를 건드리려면 어떻게 해야할까요? -->
		<!--
			'몬스터 추가하기' 버튼을 클릭했을 때 자식(MonsterList.vue)의 sendAddMonster 메소드를 호출,
			자식의 sendAddMonster 메소드에서 $emit을 사용해 부모(Monster.vue)로 add 이벤트가 발생했음을 알려줍니다.
			부모 컴포넌트에서 자식의 속성명으로 바인딩한 @add(v-on:add와 같음)를 받아 새로운 메소드 addRealMonster를 호출합니다.
		-->
		<p><button @click="sendAddMonster">몬스터 추가하기</button></p>

		<!-- @과제: -->
		<!--
			as-is: 지금은 MonsterModal.vue 대신 각 몬스터의 <li> 아래 세부 내용(이름, 나이, 설명)이 나타나고 있죠?
			to-be: 몬스터의 세부 내용을 MonsterModal.vue에 옮겨 몬스터 자세히 보기 버튼 클릭 시 MonsterModal 컴포넌트를 호출, 세부 내용(이름, 나이, 설명)을 보여줍니다.
			힌트: 2회 질문 가능
		-->
		<MonsterModal v-show="isShow" :monster="currentMonster" @close="closeMonsterInfo" />
	</div>
</template>

<script>
import MonsterModal from '@/components/MonsterModal.vue'

export default {
	components: { 
		MonsterModal
	},
	props: ['monsters'],
	data: () => ({
		isShow: false,
		currentMonster: {}
	}),
	mounted() {

	},
	methods: {
		sendAddMonster() {
			// 자식 -> 부모 컴포넌트 이벤트 전달 형식
			// this.$emit('부모 컴포넌트에 발생시킬 이벤트 명') 
			this.$emit('add')
		},
		viewMonsterInfo(target) {
			this.isShow = true
			this.currentMonster = target
		},
		closeMonsterInfo() {
			this.isShow = false;
			
		}
	}
}
</script>

<style scoped>
	
</style>