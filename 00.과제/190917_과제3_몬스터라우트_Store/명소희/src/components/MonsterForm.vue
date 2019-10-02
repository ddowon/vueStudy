<template>
	<div>
		<!-- 예시 form입니다. 아래 내용을 토대로 addMonster를 호출하는 onSubmit 메소드를 작성하세요. Element-UI를 활용해도 좋습니다. -->
		<form @submit.prevent="onSubmit">
			<label>몬스터 이름: <input v-model="newObj.name"></label>
			<label>몬스터 나이: <input v-model="newObj.age"></label>
			<label>몬스터 설명: <input v-model="newObj.desc"></label>
			<label>몬스터 hp: <input v-model="newObj.hp"></label>

			<p><button type="submit">몬스터 추가하기</button></p>
		</form>
	</div>
</template>
<script>
import { store, mutations } from '@/store/index'

export default {
	data: () => ({
		newObj: {
			name: '',
			age: null,
			desc: '',
			hp: null,
			fullHp: 0,
			status: {
				danger: false,
				died: false
			}
		}
	}),
	methods: {
		onSubmit() {
			this.newObj.fullHp = this.newObj.hp
			this.addMonster()
		},
		addMonster() {
			if (confirm('추가하시겠습니까?')) {
				mutations.addMonster(this.newObj)
				alert(`몬스터 ${this.newObj.name}님을 추가했습니다.`)
				setTimeout(() => {
					this.$router.push({ name: 'monsterView', params: { id: store.monsters.length - 1 } })
				}, 300)
			}
		}
	}
}
</script>

<style scoped>
	label {display:block;margin-bottom:10px}
</style>