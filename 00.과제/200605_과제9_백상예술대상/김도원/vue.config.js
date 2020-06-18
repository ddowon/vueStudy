const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
	filenameHashing: false,
	productionSourceMap: false,
	css: {
		extract: true
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