<template>
	<div>
		<!-- 몬스터 추가하기 버튼을 눌렀을 때 지정된 내용 말고 form을 만들어 원하는 몬스터를 삽입해 보세요. -->
		<form action=""></form>
		<p>입력 form을 만들어 원하는 몬스터를 추가해 보세요.</p>

		<!-- 예시 form입니다. 아래 내용을 토대로 addMonster를 호출하는 onSubmit 메소드를 작성하세요. Element-UI를 활용해도 좋습니다. -->
		<form @submit.prevent="onSubmit">
			<label>몬스터 이름: <input v-model="newObj.name"></label>
			<label>몬스터 나이: <input v-model="newObj.age"></label>
			<label>몬스터 설명: <input v-model="newObj.desc"></label>
			<label>몬스터 hp: <input v-model="newObj.hp"></label>
			<label>몬스터 fullHp: <input v-model="newObj.fullHp"></label>
			<label for="typeA">몬스터 위험도: <input v-model="newObj.status.danger" type="checkbox"></label>
			<label for="typeB">몬스터 생사여부: <input v-model="newObj.status.died" type="checkbox"></label>
			<label>몬스터 imgName: <input v-model="newObj.imgName"></label>

			<p><button type="submit">몬스터 추가하기</button></p>
		</form>

	</div>
</template>
<script>
import { store, mutations } from '@/store/index'

export default {
	data: () => ({
		monsters: [],
		name: '',
		newObj: {
			name: null,
			age: null,
			desc: null,
			hp: null,
			fullHp: null,
			status: {
			 	danger: false,
			 	died: false 
			},
			imgName: null
		}

	}),
	mounted() {
		this.monsters = store.monsters
	},
	methods: {
		onSubmit() {
			

			this.addMonster()
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
			mutations.addMonster(this.newObj)
		}
	}
}
</script>

<style scoped>
	
</style>