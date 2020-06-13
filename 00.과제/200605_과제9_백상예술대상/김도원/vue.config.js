const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
	filenameHashing: false,
	productionSourceMap: false,
	css: {
		extract: true
	},
	devServer: {
		proxy: {
			'/api': {
				// 나중에 development/production mode에 따라 환경변수 구분하여 수정해 보자.
				// target: process.env.VUE_APP_API_URL,
				target: 'http://localhost:3000/api',
				changeOrigin: true,
			}
		}
	},
	chainWebpack: config => {
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')
		config
			.plugin('extract-css')
			.tap(([options, ...args]) => [
				Object.assign({}, options, {
					filename: 'css/style.css'
				}),
				...args
			])

		config.module
			.rule('fonts')
			.test(/\.(ttf|otf|eot|woff|woff2)$/)
			.use('url-loader')
			.loader('url-loader')
			.tap(options => ({
				...options,
				limit: -1,
				fallback: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]'
					}
				}
			}))

	}
}