const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
	devServer: {
		proxy: {
			'/api': {
				// 나중에 development/production mode에 따라 환경변수 구분하여 수정해 보자.
				// target: process.env.VUE_APP_API_URL,
				target: 'http://localhost:3000/api',
				changeOrigin: true,
			}
		}
	}
}