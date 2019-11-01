<template>
	<div>
		<form @submit.prevent="onSubmit">
			<el-input placeholder="몬스터 이름" v-model="monster.name"></el-input>
			<el-input placeholder="몬스터 나이" v-model.number="monster.age" type="number"></el-input>
			<el-input placeholder="몬스터 설명" v-model="monster.desc"></el-input>
			<el-input placeholder="몬스터 hp" v-model.number="monster.hp" type="number"></el-input>

			<p><button type="submit">몬스터 추가하기</button></p>
		</form>
	</div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
	data: () => ({
		monster: {
			name: '',
			age: null,
			desc: '',
			hp: null,
			fullHp: 0
		}
	}),
	methods: {
		onSubmit() {
			this.monster.fullHp = this.monster.hp
			this.addMonster()
		},
		addMonster() {
			if (confirm(`${this.monster.name}님을 추가하시겠습니까?`)) {
				this.$store.dispatch('monster/addMonster', {
					obj: this.monster,
					callback: (name) => {
						alert(`몬스터 ${name}님을 추가했습니다.`)
						this.$router.push({ name: 'monsterView', params: { id: this.$store.state.monster.monsters.length - 1 } })
					}
				})
			}
		}
	}
}
</script>

<style scoped>
	
</style>