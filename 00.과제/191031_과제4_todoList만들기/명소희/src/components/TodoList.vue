<template>
  <div class="todoList">
    <ul>
      <li v-for="plan in getPlanList" :key="plan.id" :class="{ done: plan.isFinish }">
        <input type="checkbox" v-model="plan.isFinish" @click=clickCheck(plan)>
        <span></span>
        <p class="num">{{ plan.id }}</p>
        <p cleass="title">{{ plan.title }}</p>
        <div>
          <el-button type="primary" icon="el-icon-edit" circle @click="openModal(['edit', plan.id])"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="openModal(['delete', plan.id])"></el-button>
        </div>
      </li>
    </ul>

    <TodoModal v-show="modalShow" />
  </div>
  
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import TodoModal from '@/components/common/TodoModal.vue'

export default {
  components: { 
		TodoModal
	},
  data: () => ({
    isShow : false,

  }),
  computed : {
    ...mapState(['plans', 'showType', 'modalShow']),
    ...mapGetters(['getPlanList'])
  },
  methods: {
    ...mapActions(['openModal']),
    clickCheck(target){
      target.isFinish = true;

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
  padding-top: 10px;
}

a {
  color: #42b983;
}

.todoStatus {padding-top:50px;}
li {position: relative; width: 100%; height: 50px;  background: #e8e8e8; border-bottom:1px solid #ccc;}
li span {display:inline-block; width: 1px; height: 100%; vertical-align:middle;}
li p {display:inline-block; vertical-align:middle;}
li p.num {width: 80px; text-align: center;}
li div {position: absolute; right: 0; top: 0;}
</style>
