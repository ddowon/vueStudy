<template>
  <div>
    <div class="btn_list_wrap">
      <button class="all" @click="currentList('all')">전체</button>
      <button class="yet" @click="currentList('done')">완료</button>
      <button class="done" @click="currentList('yet')">미완료</button>
    </div>
    <ul class="list_wrap">
      <li v-for="(item, idx) in getTodoList" :key="idx" :class="{'done' : item.done}">
        <div>
          <input type="checkbox" :id="'itemCheck'+item.id" v-model="item.done" @click="checkItem(item.id)">
          <label :for="'itemCheck'+item.id" ></label>
        </div>
        <div>{{idx + 1}}. </div>
        <div class="title">{{item.title}}</div>
        <div class="btn_wrap">
          <button type="button" class="btn_edit" @click="setModal(item, 'edit')"><i class="el-icon-edit"></i>수정하기</button>
          <button type="button" class="btn_delete" @click="setModal(item, 'delete')"><i class="el-icon-delete"></i>삭제하기</button>
        </div>
      </li>
    </ul>
    <button class="btn_delete_all" @click="resetItems">전체삭제</button>
    <div class="search">
      <input type="text" v-model="searchKeyword">
      <button class="btn_search" @click="searchList(searchKeyword)">찾기</button>
    </div>
    <Modal v-show="modalStatus.isShowing" :item="selectedItem" :type="type"/>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Modal from '@/components/common/Modal.vue'
export default {
  components: {
    Modal
  },
  data: ()=>({
    type: '', 
    selectedItem: {},
    searchKeyword: ''
  }),
  computed: {
    ...mapState([
      'todoList','modalStatus', 'searchedList'
    ]),
    ...mapGetters([
      'getModalStatus', 'getTodoList', 'getSearchedList'
    ])
  },
 
  methods: {
    ...mapActions([
      'deleteItem', 'openModal', 'currentList', 'searchList', 'resetItems', 'checkItem'
    ]),
    setModal (item, type) {
      this.type = type
      this.selectedItem = item
      this.openModal('openModal')
    }
  }
  
}
</script>

<style scoped>
  .list_wrap li > div { display: inline }
  .list_wrap .done { color: #ccc; text-decoration: line-through}
</style>
