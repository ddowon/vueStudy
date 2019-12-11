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

import App from './App.vue'
import store from './store'
import router from './router'


const firebaseConfig = {
	apiKey: "AIzaSyBD1v79hHSAY7dMkKvZzy92VUpCaKnHoL8",
	authDomain: "movie-dowon.firebaseapp.com",
	databaseURL: "https://movie-dowon.firebaseio.com",
	projectId: "movie-dowon",
	storageBucket: "movie-dowon.appspot.com",
	messagingSenderId: "712326595834",
	appId: "1:712326595834:web:fd178d5c551951b844b543"
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
