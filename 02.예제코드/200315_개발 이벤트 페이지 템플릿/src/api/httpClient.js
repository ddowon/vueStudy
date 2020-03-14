import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'
import httpStatusCode from '~/httpStatusCode'
// import cookie from '@/utils/cookie'
// import appLocalStorage from '@/utils/storage'

const cacheConfig = {
	enabledByDefault: false, 
	cacheFlag: 'useCache'
}

const throttleConfig = {
	threshold: 1500
}

// 지금은 webmw의 URL을 기본으로 사용
// 먼 훗날 개발 이벤트 페이지 작업 시 두 개의 axios request 생성 필요
const config = {
	baseURL: process.env.VUE_APP_API_WEBMW_URL,
	timeout: 3000,
	headers: {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache'
	},
	adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig), throttleConfig)
}

const client = axios.create(config)
// 먼 훗날 인증 토큰을 사용하게 될 때를 대비
// const getAuthToken = () => appLocalStorage.getItem('authToken')

const requestInterceptor = (config) => {
	// 먼 훗날 인증 토큰을 사용하게 될 때를 대비
	// if (store.getters.token) {
	// 	config.headers['Authorization'] = getAuthToken()
	// }
	return config
}

// 먼 훗날 인터셉터를 사용하게 될 때를 대비
const responseInterceptor = (response) => {
	return response
}

const errorInterceptor = (error) => {
	// if (error.response.status) {
	// 	switch (error.response.status) {
	// 		case 400:
	// 			console.error(error.response.status, error.message)
	// 			break
	
	// 		case 401:
	// 			// 먼 훗날 인증 토큰을 사용하게 될 때를 대비
	// 			// appLocalStorage.removeItem('authToken')
	// 			break
	
	// 		default:
	// 			console.error(error.response.status, error.message)
	// 	}
	// }

	if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
		return Promise.reject(error)
	}

	if (error.response) {
		// alert(error.response.data.message)
	}
}

client.interceptors.request.use(requestInterceptor)
client.interceptors.response.use(responseInterceptor, errorInterceptor)

export default client