import Vue from 'vue'
import monsters from '@/store/monsters'

export const store = Vue.observable({
	monsters: monsters
})

export const mutations = {
	// 여기에 addMonster와 removeMonster를 구현해 보세요.

	addMonster( monster ) {

		store.monsters.push( monster )
	},

	removeMonster( monsterIdx ) {
		
		store.monsters.splice( monsterIdx, 1 )
		
	}

}