<template>
  <div>
    <input ref="dowon" class="todo_input" placeholder="할 일을 입력해주세요." v-model="newTitle" >
    <button class="todo_enter" @click="addItem"><i class="el-icon-circle-plus-outline"></i>추가</button>
    <el-divider></el-divider>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data: () => ({
    newTitle: ''
  }),

  methods: {
    ...mapActions([
      'addItem'
    ]),
    addItem () {
      let vm = this
      let newTitle = this.newTitle
      this.$store.dispatch('addItem', {
          newTitle,
          callback() {
            vm.newTitle = ''
          }
        }
      )
    }
  }
}
</script>

<style scoped>
  .todo_input { padding: 0 10px; width: 400px; height: 40px; border: 1px solid #999; border-radius: 10px; }
  .todo_input::placeholder { color: #ccc }
  .todo_enter { width: 60px; height: 40px; border: 1px solid #999; border-radius: 10px; }
</style>
