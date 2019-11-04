let monsters = [
	{
		name: '쿠키몬스터',
		age: 3,
		desc: '똑똑하고 지적이에요. 쿠키를 좋아해요.',
		hp: 100,
		fullHp: 100,
		imgName: 'cookie'
	},
	{
		name: '무릉이',
		age: 1,
		desc: '귀여워요. 새내기라 어리버리해서 많이 알려줘야 해요.',
		hp: 100,
		fullHp: 100,
		imgName: 'mureung'
	},
	{
		name: '또원이',
		age: 3000,
		desc: '천재이자 맥주 마스터예요. 실제 나이는 3000살이라는 소문이...',
		hp: 100,
		fullHp: 100,
		imgName: 'ddowon'
	},
	{
		name: '망소',
		age: 17,
		desc: '옆집 사는 성훈이 바라기예요. 마음만은 열일곱이라는데...',
		hp: 100,
		fullHp: 100,
		imgName: 'mangso'
	},
	{
		name: '은서',
		age: 2,
		desc: '은서는 천사예요. 아빠보단 엄마를 좋아한다고..!',
		hp: 100,
		fullHp: 100,
		imgName: 'eunseo'
	},
	{
		name: 'JJ',
		age: -100,
		desc: '뭔가 이상해요. 하는 꼴을 보면 아직 알에서 부화하지 않은 것 같아요. 실체가 없어요.',
		hp: 15,
		fullHp: 15,
		imgName: 'jj'
	}
]

const state = {
	monsters: monsters,
	monster: {},
	activeTab: 0,
	tabs: [ '몬스터 정보', '몬스터 때리기' ],
	colors: [
		{ color: '#f56c6c', percentage: 20 },
		{ color: '#e6a23c', percentage: 40 },
		{ color: '#6f7ad3', percentage: 100 }
	]
}

const mutations = {
	switchTab(state, idx) {
		state.activeTab = idx
	},
	setMonster(state, id) {
		state.monster = monsters[id]
	},
	hitMonster(state) {
		if (state.monster.hp >= 10) {
			state.monster.hp -= 10
		} else {
			state.monster.hp = 0
		}
	},
	addMonster(state, obj) {
		state.monsters.push(obj)
	},
	removeMonster(state, id) {
		state.monsters.splice(id, 1)
	}
}

const actions = {
	switchTab({ commit }, idx) {
		commit('switchTab', idx)
	},
	fetchMonster({ commit }, payload) {
		let err = null
		if (payload.id >= 0 && payload.id < state.monsters.length) {
			commit('setMonster', payload.id)
		} else {
			err = 'monsters 배열에서 데이터를 찾을 수 없습니다.'
		}
		payload.callback(err)
	},
	hitMonster({ commit }) {
		commit('hitMonster')
	}, 
	addMonster({ commit }, payload) {
		commit('addMonster', payload.obj)
		setTimeout(() => {
			payload.callback(payload.obj.name)
		}, 1000)
	},
	removeMonster({ commit }, payload) {
		commit('removeMonster', payload.id)
		setTimeout(() => {
			payload.callback(payload.name)
		}, 1000)
	}
}

const getters = {
	imgPath() {
		let suffix = (state.monster.hp <= 0) ? 'after.jpg' : 'before.jpg'
		try {
			return require(`@/assets/${state.monster.imgName}_${suffix}`)
		} catch(e) {
			return require(`@/assets/default.png`)
		}
	},
	hp(state) {
		return state.monster.hp / state.monster.fullHp * 100
	},
	monster() {
		return state.monster
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
