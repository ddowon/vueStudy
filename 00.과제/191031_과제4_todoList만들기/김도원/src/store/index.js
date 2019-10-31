import Vue from 'vue'
import Vuex from 'vuex'
import fn from '../util/helpers'

Vue.use(Vuex)

const state = {
    modalStatus: {
        isShowing: false,
        info: {}
    },
    isShowingModal: false,
    modalTitle: 'default',
    currentList : 'all',
    todoList : JSON.parse(localStorage.getItem('todoList') ) || [],
    searchedList: []
}

const mutations = {

    closeModal (state) {
        state.modalStatus.isShowing = false
    },
    addItem (state, payload) {
        var lastId = 0
        if (state.todoList.length) {
            lastId = state.todoList[state.todoList.length-1].id
        }
        state.todoList.push({title: payload, id: lastId+1, done: false})
        localStorage.setItem('todoList', JSON.stringify(state.todoList))

    },
    editItem (state, payload) {
        let itemIdx = state.todoList.findIndex( list => {
            return list.id === payload.idx
        })
        state.todoList[itemIdx].title = payload.editItem
        localStorage.setItem('todoList', JSON.stringify(state.todoList))
        
    },
    checkItem (state, payload) {
        let itemIdx = fn.findListById(state.todoList, payload)
        state.todoList[itemIdx].done = !state.todoList[itemIdx].done
        localStorage.setItem('todoList', JSON.stringify(state.todoList))
    },
    resetItems (state) {
        state.todoList = []
        localStorage.setItem('todoList', JSON.stringify(state.todoList))
        
    },
    deleteItem (state, payload) {
        let item = state.todoList.findIndex( list => {
            return list.id === payload
        })
        state.todoList.splice(item,1)
        localStorage.setItem('todoList', JSON.stringify(state.todoList))
        
    },
    openModal (state, payload) {
        state.modalStatus.isShowing = true
        state.modalStatus.info = payload
    },
    currentList (state, payload) {
        state.currentList = payload
        state.searchedList = []
    },
    searchList(state, payload) {
        state.searchedList = state.todoList.filter(item => {
            return item.title.includes(payload)
        })
    }
}

const actions = {
    addItem (context, payload) {
        context.commit('addItem', payload.newTitle)
        setTimeout(() => {
            payload.callback()
        }, 100)
    },
    deleteItem (context, payload) {
        context.commit('deleteItem', payload)
        context.commit('closeModal', payload)

    },
    editItem (context, payload) {
        context.commit('editItem', payload)
        context.commit('closeModal', payload)
        setTimeout(() => {
            payload.callback()
        }, 100)
    },
    checkItem (context, payload) {
        context.commit('checkItem', payload)
    },
    resetItems (context) {
        context.commit('resetItems')
    },
    openModal (context, payload) {
        context.commit('openModal', payload)
    },
    closeModal (context) {
        context.commit('closeModal')
    },
    currentList (context, payload) {
        context.commit('currentList', payload)
    },
    searchList({ commit }, payload) {
        commit('searchList', payload)
    }
}

const getters = {
    getTodoList(state) {
        if (state.searchedList.length) {
            return state.searchedList
        } else {
            if (state.currentList === 'done') {
                return state.todoList.filter(item => {
                    return item.done
                })
            } else if (state.currentList === 'yet') {
                return state.todoList.filter(item => {
                    return !item.done
                })
            } else {
                return state.todoList
            }
        }
    },
    getSearchedList(state) {
        return state.searchedList
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})


