import 'babel-polyfill'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ko'
import 'element-ui/lib/theme-chalk/index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import * as firebase from 'firebase/app'
import { FB_CONFIG } from '@/constant'
import App from './App.vue'
import store from './store'
import router from './router'

const firebaseConfig = {
	apiKey: FB_CONFIG.API_KEY,
	authDomain: FB_CONFIG.AUTH_DOMAIN,
	databaseURL: FB_CONFIG.DATABASE_URL,
	projectId: FB_CONFIG.PROJECT_ID,
	storageBucket: FB_CONFIG.STORAGE_BUCKET,
	messagingSenderId: FB_CONFIG.MESSAGING_SENDER_ID,
	appId: FB_CONFIG.APP_ID
}

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueAxios, axios)

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')
