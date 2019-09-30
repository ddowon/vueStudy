<template>
	<div>
		<!-- 몬스터 추가하기 버튼을 눌렀을 때 지정된 내용 말고 form을 만들어 원하는 몬스터를 삽입해 보세요. -->
		<form action=""></form>
		<p>입력 form을 만들어 원하는 몬스터를 추가해 보세요.</p>

		<!-- 예시 form입니다. 아래 내용을 토대로 addMonster를 호출하는 onSubmit 메소드를 작성하세요. Element-UI를 활용해도 좋습니다. -->
		<form @submit.prevent="onSubmit">
			<el-input placeholder="몬스터 이름" v-model="name"></el-input>
			<el-input placeholder="몬스터 나이" v-model.number="age" type="number"></el-input>
			<el-input placeholder="몬스터 설명" v-model="desc"></el-input>
			<el-input placeholder="몬스터 hp" v-model.number="hp" type="number"></el-input>

			<p><button type="submit">몬스터 추가하기</button></p>
		</form>

	</div>
</template>
<script>
import { store, mutations } from '@/store/index'

export default {
	data: () => ({
		monsters: [],
		newMonster: '',
		name: '',
		age: '',
		desc: '',
		hp: ''
	}),
	mounted() {
		this.monsters = store.monsters
		
	},
	methods: {
		onSubmit() {

			this.newMonster = { 
				name: this.name, 
				age: this.age, 
				dese: this.desc, 
				hp: this.hp, 
				fullHp: this.hp,
				status: {
					danger: false,
					sick: false, 
					died: false
				}
			}
			mutations.addMonster(this.newMonster)
			
			alert( '몬스터를 추가하였습니다!' )
			this.$router.push({ name: 'monster' })
			

		},
		addMonster() {
			// let newObj = {
			// 	name: '새몬스터',
			// 	age: -100,
			// 	desc: '어떤 몬스터가 추가될까요?',
			// 	hp: 100,
			// 	fullHp: 100,
			// 	status: {
			// 		danger: false,
			// 		died: false 
			// 	}
			// }

			// store에 작성한 몬스터 추가하기 함수를 활용해 보세요.
		}
	}
}
</script>

<style scoped>
	
</style>