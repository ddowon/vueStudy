import Vuex from 'vuex'
import Vue from 'vue'
// import plans from '@/api/plans'

Vue.use(Vuex)

// let fetchPlans = () => {
//   let result = []
//   if (localStorage.getItem('plans')) {
//     return JSON.parse(localStorage.getItem('plans'))
//   } else {
//     return result
//   }
// }

export default new Vuex.Store({
  state : {
    plans : JSON.parse(localStorage.getItem('plans')) || [],
    plan : {},
    showType : 'all',
    selectIdx : 0,
    activePage : '',
    modalShow: false
  }, 
  mutations : {
    addTodo(state, payload) {
      // var lastId = 0
      if (!state.plans.length) {
        state.plans = [];
      }
    
      if(!state.plans.length){
        payload.id = 0
      }else{
        payload.id = state.plans[state.plans.length - 1].id + 1;
      }
      
      state.plans.push(payload)
      localStorage.setItem('plans', JSON.stringify(state.plans))
      
      
      
    },
    showList(state, payload){
      state.showType = payload

    },
    openModal(state, payload) {
      state.modalShow = true
      state.plan = state.plans[payload[1]]
      state.selectIdx = payload[1]

      if (payload[0] == 'edit'){
        state.activePage = 'edit'
      } else {
        state.activePage = 'delete'
      }

     
    },
    closeModal(state) {
      state.modalShow = false

    },
    editTodo(state, payload){
      state.plans[payload[1]].title = payload[0]
      
    },
    removeTodo(state, payload) {
      console.log(payload)
      state.plans.splice(payload, 1)
      state.plans.map(function(ele, key) {
        // console.log(ele + '/' + key)
        state.plans[key].id = key
      });
      localStorage.setItem('plans', JSON.stringify(state.plans))

    },
    switchCurrent(state, payload) {
      state.showType = payload
    }
  },
  actions : {
    addTodo(context, payload) {

      context.commit('addTodo', payload)
        // console.log(payload)

    },
    showList(context, payload){
      context.commit('showList', payload)
      
    },
    openModal(context, payload) {
     context.commit('openModal', payload)

    },
    editTodo(context, payload){
      context.commit('editTodo', payload)
    },
    removeTodo(context, payload){
      if(confirm('삭제 하시겠습니까?')){
        context.commit('removeTodo', payload)
      }
     
    }
  },

  getters : {
    getPlanList(state) {
      if (state.showType === 'clear') {
        return state.plans.filter(plan => {
          return plan.isFinish === true
        })
      } else if (state.showType === 'yet') {
        return state.plans.filter(plan => {
          return plan.isFinish === false
        })
      } else {
        return state.plans
      }
    }

  }
})



