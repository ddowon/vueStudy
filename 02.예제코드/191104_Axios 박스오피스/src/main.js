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
import { FIREBASE_UI } from '@/constant'
import App from './App.vue'
import store from './store'
import router from './router'

const firebaseConfig = {
	apiKey: FIREBASE_UI.API_KEY,
	authDomain: FIREBASE_UI.AUTH_DOMAIN,
	databaseURL: FIREBASE_UI.DATABASE_URL,
	projectId: FIREBASE_UI.PROJECT_ID,
	storageBucket: FIREBASE_UI.STORAGE_BUCKET,
	messagingSenderId: FIREBASE_UI.MESSAGING_SENDER_ID
}

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.use(VueAxios, axios)

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')
