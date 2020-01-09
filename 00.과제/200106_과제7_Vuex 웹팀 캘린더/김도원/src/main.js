import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from './plugins/vuetify'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false


Vue.use(VueAxios, axios)
Vue.use(ElementUi)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
