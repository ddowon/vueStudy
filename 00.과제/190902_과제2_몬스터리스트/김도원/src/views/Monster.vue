<template>
	<div class="homework">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<MonsterList :monsters='monsterList' @showMonster='showMonsterrr'/>
		<MonsterModal :selectedMontser='selectedMontser' :isShowing='isShowing'/>
	</div>
</template>

<script>
// <router-view>에 주입할 컴포넌트에서 서브 컴포넌트를 불러올 때는
// import를 사용한 후, export default 안 components 배열에 서브 컴포넌트를 명시합니다.
import MonsterList from '@/components/MonsterList.vue'
import MonsterModal from '@/components/MonsterModal.vue'

export default {
	props: ['pageTitle'],
	components: {
		MonsterList, MonsterModal
	},
	data: () => ({
		monsterList : [
			{ name : '몬스터1', fullHp: 100, hp: 100, desc: '설명1', isDied: false, state: { danger: false, died: false }  },
			{ name : '몬스터2', fullHp: 200, hp: 200, desc: '설명2', isDied: false, state: { danger: false, died: false }  },
			{ name : '몬스터3', fullHp: 300, hp: 300, desc: '설명3', isDied: false, state: { danger: false, died: false }  },
			{ name : '몬스터4', fullHp: 400, hp: 400, desc: '설명4', isDied: false, state: { danger: false, died: false }  },
			{ name : '몬스터5', fullHp: 500, hp: 500, desc: '설명5', isDied: false, state: { danger: false, died: false }  }
		],
		selectedMontser : '',
		isShowing : false
	}),
	computed: {

	},
	methods: {
		showMonsterrr (monster) {

			this.isShowing = true;
			this.selectedMontser = monster;
		},
		
	}
}
</script>

<style scoped>
</style>