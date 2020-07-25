import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'
import httpStatusCode from '~/httpStatusCode'
import store from '@/store'

const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI

const cacheConfig = {
	enabledByDefault: false, 
	cacheFlag: 'useCache'
}

const throttleConfig = {
	threshold: 1500
}

const config = {
	baseURL: API_URI,
	timeout: 3000,
	Accept: 'application/json',
	headers: {
		'Cache-Control': 'no-cache'
	},
	adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig), throttleConfig)
}

const client = axios.create(config)

const isHandlerEnabled = (config = {}) => {
	return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true
}

const requestInterceptor = (config) => {
	if (store.getters['auth/token']) {
		config.headers['x-access-token'] = store.getters['auth/token']
	}

	return config
}

const responseInterceptor = (response) => {
	return response
}

const errorInterceptor = (error) => {
	let toastMessage = '통신 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'

	if (error.response && isHandlerEnabled(error.config) && error.response.data.message) {
		toastMessage = error.response.data.message
	}
	console.log(error)
	return Promise.reject(toastMessage)
}

client.interceptors.request.use(requestInterceptor, errorInterceptor)
client.interceptors.response.use(responseInterceptor, errorInterceptor)

export default client