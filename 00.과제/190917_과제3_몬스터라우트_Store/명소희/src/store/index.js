import Vuex from 'vuex'
import Vue from 'vue'
import monsters from '@/api/monsters'

Vue.use(Vuex)


export default new Vuex.Store({
	state : {
		monsters: monsters,
		monster: {},
		activeTab: null,
		tabs: [ '몬스터 정보', '몬스터 때리기' ],
		colors: [
			{ color: '#f56c6c', percentage: 20 },
			{ color: '#e6a23c', percentage: 40 },
			{ color: '#6f7ad3', percentage: 100 }
		]

	},
	mutations : {
		switchTab(state, payload) {
			state.activeTab = payload
		},
		hitMonster(state) {
			if (!state.monster.status.died) {
				state.monster.hp -= 10
				if (state.monster.hp <= 0) {
					state.monster.status.died = true
				} else if (state.monster.hp <= 30) {
					state.monster.status.danger = true
				}
			}
		},
		removeMonster(state, payload) {
			state.monsters.splice(payload, 1);

		},
		setMonster(state, payload) {
			state.monster = state.monsters[payload]

		},
		addMonster(state, payload) {
			state.monsters.push(payload)
		}
	},
	actions: {
		removeMonster(context, payload){
			if (confirm('삭제하시겠습니까?')) {
				context.commit('removeMonster', payload.id)
				alert(`${payload.id + 1}번 몬스터 ${payload.name}님을 삭제했습니다.`)

			}
		},
		getMonster(context, payload){
			
			context.commit('setMonster', payload);
		},
		addMonster(context, payload) {
			if (confirm('추가하시겠습니까?')) {
				context.commit('addMonster', payload)
				alert(`몬스터 ${payload.name}님을 추가했습니다.`)
			}
		}
		
	},
	getters : {
		monster(state) {
			return state.monster
		},
		imgPath(state) {
			let suffix = (state.monster.status.died) ? 'after.jpg' : 'before.jpg'

			// src/assets에 있는 이미지 바인딩을 위해 require 또는 import 구문으로 이미지를 불러옵니다.
			// 해당 모듈(여기서는 이미지 파일)이 폴더에 있는지 확인하기 위해 try/catch 구문을 사용합니다.
			// 모듈이 있으면 try 블록 안 구문을 실행, 없으면 catch(e) 블록 안 구문을 실행합니다.
			try {
				return require(`@/assets/${state.monster.imgName}_${suffix}`)
			} catch(e) {
				return require(`@/assets/default.png`)
			}
		},
		hp(state) {
			return state.monster.hp / state.monster.fullHp * 100
		}
	}
})




// export const store = Vue.observable({
// 	monsters: monsters
// })

// export const mutations = {
// 	addMonster(obj) {
// 		store.monsters.push(obj)
// 	},
// 	removeMonster(idx) {
// 		store.monsters.splice(idx, 1)
// 	}
// }