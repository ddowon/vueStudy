<template>
  <div>
    <div class="btn_list_wrap">
      <button class="all" @click="currentList('all')">전체</button>
      <button class="yet" @click="currentList('done')">완료</button>
      <button class="done" @click="currentList('yet')">미완료</button>
    </div>
    <ul class="list_wrap">
      <li v-for="(item, idx) in getTodoList()" :key="idx" :class="{'done' : item.done}">
        <div>
          <input type="checkbox" :id="'itemCheck'+idx" v-model="item.done">
          <label :for="'itemCheck'+idx" ></label>
        </div>
        <div>{{idx + 1}}. </div>
        <div class="title">{{item.title}}</div>
        <div class="btn_wrap">
          <button type="button" class="btn_edit" @click="setModal(item, 'edit')"><i class="el-icon-edit"></i>수정하기</button>
          <button type="button" class="btn_delete" @click="setModal(item, 'delete')"><i class="el-icon-delete"></i>삭제하기</button>
        </div>
      </li>
    </ul>
    <!-- <div class="search">
      <input type="text" v-model="search_input">
      <button class="btn_search" @click="searchList(search_input)">찾기</button>
    </div> -->
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
    search_input: ''
  }),
  computed: {
    ...mapState([
      'todoList','modalStatus'
    ]),
    ...mapGetters([
      'getModalStatus','sortList', 'getTodoList'
    ])
  },
 
  methods: {
    ...mapActions([
      'deleteItem','openModal','currentList'
    ]),
    setModal (item, type) {
      this.type = type
      this.selectedItem = item
      this.openModal('openModal')
    }
    // searchList () {
    //   var list = this.todoList.filter( item => {
    //     return item.title.includes(this.search_input) === true
    //   })
    // }
  }
  
}
</script>

<style scoped>
  .list_wrap li > div { display: inline }
  .list_wrap .done { color: #ccc; text-decoration: line-through}
</style>
