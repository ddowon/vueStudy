import Vue from 'vue'
import vueMoment from 'vue-moment'
import moment from 'moment'

// 날짜 표기 형식을 한글로 수정
moment.locale('ko')

Vue.use(vueMoment, { moment })