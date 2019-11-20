module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'https://openapi.naver.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}