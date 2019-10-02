import Vue from 'vue'
import monsters from '@/store/monsters'

export const store = Vue.observable({
	monsters: monsters
})

export const mutations = {
	addMonster(monster) {
		store.monsters.push(monster)
	},
	removeMonster(monsterIdx) {
		store.monsters.splice(monsterIdx, 1)
	}
}