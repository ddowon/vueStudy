<template>
  <div id="app">
    <AppNav/>
    <el-main>
      <router-view :page-title="pageTitle"/>
    </el-main>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'

export default {
  name: 'app',
  components: {
    AppNav
  },

  data: () => ({
    docTitle: 'UI 파트 스터디',
    pageTitle: null
  }),
  mounted() {
    document.title = (this.$route.meta.title) ? `${this.$route.meta.title} :: ${this.docTitle}` : this.docTitle
    this.pageTitle = (this.$route.meta.title) ? this.$route.meta.title : this.docTitle
  },
  watch: {
    $route(to, from) {
      document.title = (this.$route.meta.title) ? `${this.$route.meta.title} :: ${this.docTitle}` : this.docTitle
      this.pageTitle = (this.$route.meta.title) ? this.$route.meta.title : this.docTitle
    }
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
