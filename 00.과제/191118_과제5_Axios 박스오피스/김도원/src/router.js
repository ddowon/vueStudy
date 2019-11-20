import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import VuexBoxOffice from '@/views/vuex/BoxOffice.vue'
import NotFound from '@/views/NotFound.vue'

Vue.config.productionTip = false

Vue.use(Router)

export default new Router({
  routes:[
    {path: '/', name: 'home', meta: {title: '첫 화면'}, component: Home },
    {path: '/boxoffice', name: 'vuexBoxOffice', meta: {title: 'Vuex 박스오피스'}, component: VuexBoxOffice },
    {path: '/404', name: 'notFound', meta: {title: '페이지를 찾을 수 없습니다.', useMenu: false }, component: NotFound}
  ]
})