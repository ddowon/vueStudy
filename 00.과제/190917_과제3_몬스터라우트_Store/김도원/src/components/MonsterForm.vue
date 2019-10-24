<template>
	<div>
		<!-- 예시 form입니다. 아래 내용을 토대로 addMonster를 호출하는 onSubmit 메소드를 작성하세요. Element-UI를 활용해도 좋습니다. -->
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

export default {
	data: () => ({
		monster: {
			name: '',
			age: null,
			desc: '',
			hp: null,
			fullHp: 0,
			status: {
				danger: false,
				sick: false,
				died: false
			}
		}
	}),
	methods: {
		onSubmit() {
			this.monster.fullHp = this.monster.hp
			this.addMonster()
		},
		addMonster() {
			if (confirm('추가하시겠습니까?')) {
				this.$store.dispatch('addMonster', this.monster)
				alert(`몬스터 ${this.monster.name}님을 추가했습니다.`)
				setTimeout(() => {
					this.$router.push({ name: 'monsterView', params: { id: this.$store.state.monsters.length - 1 } })
				}, 300)
			}
		}
	}
}
</script>

<style scoped>
	
</style>