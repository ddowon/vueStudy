<template>
  <div>
      <div class="modal_wrap" :class="type">
        <div class="contents">
          <div v-if="type === 'edit'">
            <p>수정 하시겠습니까?</p>
            <input type="text" placehodler="" v-model="editInput">
            <button @click="editItem(item.id)" class="btn_edit">수정하기</button>
          </div>
          <div v-else-if="type === 'delete'">
            <p>삭제 하시겠습니까?</p>
            <button @click="deleteItem(item.id)" class="btn_delete">삭제하기</button>
          </div>
        </div> 
       <button class="btn_close" @click="closeModal"><i class="el-icon-close"></i><span>모달 닫기</span></button>
      </div> 
      <div class="overlay"></div>
  </div>
</template>

<script>

import {mapState,mapActions} from 'vuex'
export default {
  props: ['type','item'],
  computed: {
    ...mapState([
      'modalStatus'
    ])
  },
  data: () =>({
    editInput : ''
  }),
  methods: {
    ...mapActions([
      'editItem',
      'deleteItem',
      'closeModal'
    ]),
    editItem (idx) {
      let vm = this
      let editItem = this.editInput
      this.$store.dispatch('editItem', {idx, editItem, callback(){
        vm.editInput = ''
      }})
    }
  }
}
</script>

<style scoped>
  .modal_wrap { z-index: 10; position: absolute; top: 50%; left: 50%; margin: -150px 0 0 -200px; width: 400px; height: 300px; background: #fff; border-radius: 20px }
  .overlay { z-index: 9; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5)}
  .modal_wrap .btn_edit,
  .modal_wrap .btn_delete { width: 100px; height: 50px; border: none; border-radius: 10px; border: 1px solid gray}
  .modal_wrap .btn_close { position: absolute; top: 0; right: 0;  width: 50px; height: 50px;}
  .modal_wrap .btn_close span { display: inline-block; text-indent: -9999px }
  .modal_wrap .btn_close i { display: block; width: 100%; height: 100%; }
</style>
