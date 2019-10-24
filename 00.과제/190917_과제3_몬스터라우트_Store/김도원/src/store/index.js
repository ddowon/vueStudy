import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		monsters: [
			{
				name: '쿠키몬스터',
				age: 3,
				desc: '똑똑하고 지적이에요. 쿠키를 좋아해요.',
				hp: 100,
				fullHp: 100,
				status: {
					danger: false,
					sick: false, 
					died: false
				},
				imgName: 'cookie'
			},
			{
				name: '무릉이',
				age: 1,
				desc: '귀여워요. 새내기라 어리버리해서 많이 알려줘야 해요.',
				hp: 100,
				fullHp: 100,
				status: {
					danger: false,
					sick: false, 
					died: false 
				},
				imgName: 'mureung'
			},
			{
				name: '또원이',
				age: 3000,
				desc: '천재이자 맥주 마스터예요. 실제 나이는 3000살이라는 소문이...',
				hp: 100,
				fullHp: 100,
				status: {
					danger: false,
					sick: false, 
					died: false 
				},
				imgName: 'ddowon'
			},
			{
				name: '망소',
				age: 17,
				desc: '옆집 사는 성훈이 바라기예요. 마음만은 열일곱이라는데...',
				hp: 100,
				fullHp: 100,
				status: {
					danger: false,
					sick: false, 
					died: false 
				},
				imgName: 'mangso'
			},
			{
				name: '은서',
				age: 2,
				desc: '은서는 천사예요. 아빠보단 엄마를 좋아한다고..!',
				hp: 100,
				fullHp: 100,
				status: {
					danger: false,
					sick: false, 
					died: false 
				},
				imgName: 'eunseo'
			},
			{
				name: 'JJ',
				age: -100,
				desc: '뭔가 이상해요. 하는 꼴을 보면 아직 알에서 부화하지 않은 것 같아요. 실체가 없어요.',
				hp: 100,
				fullHp: 100,
				status: {
					danger: false,
					sick: false, 
					died: false 
				},
				imgName: 'jj'
			}
		],
		monster: {},
		activeTab: 0,
		tabs: [ '몬스터 정보', '몬스터 때리기' ],
		colors: [
			{ color: '#f56c6c', percentage: 20 },
			{ color: '#e6a23c', percentage: 40 },
			{ color: '#6f7ad3', percentage: 100 }
		]
	},
	mutations: {
		addMonster(state, payload) {
			state.monsters.push(payload)
		},
		removeMonster(state, payload) {
			state.monsters.splice(payload, 1)
		},
		switchTab(state, idx) {
			state.activeTab = idx
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
		}
	},
	actions: {
		addMonster(context, payload) {
			context.commit('addMonster', payload)
		},
		removeMonster(context, payload) {
			context.commit('removeMonster', payload)
		},
		switchTab(context, payload) {
			context.commit('switchTab', payload)
		},
		hitMonster(context) {
			context.commit('hitMonster')
		}
	},
	getters:{
		hp(state) {
			return state.monster.hp / state.monster.fullHp * 100
		},
		imgPath(state) {
			let suffix = (state.monster.status.died) ? 'after.jpg' : 'before.jpg'
			
			try {
				return require(`@/assets/${state.monster.imgName}_${suffix}`)
			} catch(e) {
				return require(`@/assets/default.png`)
			}
		}
	}

})