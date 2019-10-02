import Vue from 'vue'
import monsters from '@/store/monsters'

export const store = Vue.observable({
	monsters: monsters
})

export const mutations = {
	addMonster(obj) {
		store.monsters.push(obj)
	},
	removeMonster(idx) {
		store.monsters.splice(idx, 1)
	}
}