<template>
  <div class="todoInput">
    <h2>오늘의 할일</h2> 
    <form id="form" @submit.prevent="formSubmit">
      <input type="text" v-model="title"><button>등록</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    title: '',
    isFinish : false,
    id : 0
	}),
  computed: {
    ...mapState([ 'plans' ])
  },
  methods: {
    formSubmit(event){
      var title = this.title;
      var isFinish = this.isFinish;

      if(confirm('등록하시겠습니까?')){
        // this.$store.state.plans.push(this.submitTodo)
        this.$store.dispatch('addTodo', {title : title, isFinish : isFinish, id : 0});
        event.target.reset();

      }
    }
    
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

input {width: 500px; border:1px solid #ccc; height:40px}
</style>
