const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
// const TextReplaceHtmlWebpackPlugin = require('text-replace-html-webpack-plugin')

module.exports = {
	filenameHashing: false,
	productionSourceMap: false,
	css: {
		extract: true
	},
	devServer: {
		proxy: {
			'/api': {
				target: process.env.VUE_APP_API_URI,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	chainWebpack: config => {
		const apiClient = process.env.VUE_APP_API_CLIENT_FOLDER
		config.resolve.alias.set(
			'~', path.resolve(__dirname, `src/${apiClient}`)
		)
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
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => ({
				...options,
				limit: -1,
				fallback: {
					loader: 'file-loader',
					options: {
						publicPath: 'images',
						outputPath: 'images',
						name: '[path][name].[ext]',
						context: 'src/assets'
					}
				}
			}))
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

		// if (!devMode) {
		// 	config
		// 		.plugin('replace-string')
		// 		.use(TextReplaceHtmlWebpackPlugin)
		// 		.tap(([options, ...args]) => [
		// 			Object.assign({}, options, {
		// 				replacementArray: [
		// 					{
		// 						searchString: EV_CONFIG.fileName.css,
		// 						replace: `${EV_CONFIG.filePath.css}/${EV_CONFIG.fileName.css}`
		// 					},
		// 					{
		// 						searchString: EV_CONFIG.fileName.js,
		// 						replace: `${EV_CONFIG.filePath.js}/${EV_CONFIG.fileName.js}`
		// 					}
		// 				]
		// 			}),
		// 			...args
		// 		])
		// }
	}
}