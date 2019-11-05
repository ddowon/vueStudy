<template>
  <div class="todoModal">
    <div v-show="activePage == 'edit'" class="tab_cont">
      <form id="form" @submit.prevent="formEdit">
        <p><input type="text" v-model=editTitle></p>
        <button>수정하기</button>
      </form>
		</div>
		<div v-show="activePage == 'delete'" class="tab_cont">
			<p>삭제하시겠습니까?</p>
      <button @click="removeTodo(selectIdx)">삭제하기</button>
		</div>
		<p class="btn close" ><button type="button" @click="closeModal">닫기</button></p>

	</div>

</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
  data : () => ({
    editTitle : ''
  }),
  computed : {
    ...mapState(['plans', 'plan', 'selectIdx', 'activePage']),
    listIdx(){
      return this.$store.state.selectIdx
    }

  },
  methods : {
    ...mapMutations(['closeModal']),
    ...mapActions(['removeTodo']),
    formEdit(){
      if(confirm('등록하시겠습니까?')){
        this.$store.dispatch('editTodo', [this.editTitle, this.listIdx]); //
        event.target.reset();

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.todoModal {z-index:100; margin:-250px 0 0 -250px; position:absolute; left: 50%; top: 50%; width :500px; height:500px; background:#fff; border:1px solid #ccc;}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
