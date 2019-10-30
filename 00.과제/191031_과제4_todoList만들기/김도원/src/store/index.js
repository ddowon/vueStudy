import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    modalStatus: {
        isShowing: false,
        info: {}
    },
    isShowingModal: false,
    modalTitle: 'default',
    currentList : 'all',
    todoList : JSON.parse(localStorage.getItem('todoList') ) || []
}

const mutations = {

    closeModal (state) {
        state.modalStatus.isShowing = false
    },
    addItem (state, payload) {
        var todoListLen = parseInt(state.todoList.length)
        var lastId = 0
        if (todoListLen) {
            lastId = parseInt(state.todoList[todoListLen-1].id)
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
    openModal (context, payload) {
        context.commit('openModal', payload)
    },
    closeModal (context) {
        context.commit('closeModal')
    },
    currentList (context, payload) {
        context.commit('currentList', payload)
    }

}

const getters = {
    getTodoList () {
        return function(){
            let list
            if ( state.currentList === 'done') {
                list = state.todoList.filter( item => {
                    return item.done === true
                })
            } else if  ( state.currentList === 'yet') {
                list = state.todoList.filter( item => {
                    return item.done === false
                })
            } else {
                list = state.todoList
            }
            return list
        }
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})


