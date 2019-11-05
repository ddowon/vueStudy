<template>
  <div class="todoSearch">
    <el-input placeholder="Please input" v-model="input"></el-input>
    <el-button type="primary">검색</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input : ''
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
</style>
