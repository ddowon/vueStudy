  <template>
   <div id="nav">
    <el-menu
      :router="true"
      :default-active="activeLink"
      mode="horizontal"
      background-color="#073862"
      text-color="#fff"
      active-text-color="#b5dc11"
    >
      <template v-for="rule in $router.options.routes">
        <template v-if="rule.meta.useMenu != false">  
          <el-menu-item :index="rule.path" :key="rule.name">{{ rule.meta.title }}</el-menu-item>
        </template>
      </template>
    </el-menu>
   </div>
  </template>

  <script>


  export default {
    name: 'AppNav',
    data: () => ({
      activeLink : null
    }),
    mounted() {
      this.activeLink = this.$route.path
    },
    watch: {
      $route(to, from){
        this.activeLink = to.path
      }
    }
  }
   
</script>
<style scoped>
</style>
  