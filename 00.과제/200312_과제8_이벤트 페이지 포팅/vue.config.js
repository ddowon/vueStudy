const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')
const TextReplaceHtmlWebpackPlugin = require('text-replace-html-webpack-plugin')

module.exports = {
	publicPath: '',
	filenameHashing: false,
	productionSourceMap: false,
	configureWebpack: {
		output: {
			filename: 'event.ui.js'
		},
		optimization: {
			splitChunks: false
		}
	},
	css: {
		extract: {
			filename: 'style.css'
		}
	},
	chainWebpack: (config) => {
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')

		config
			.plugin('html')
			.tap(([options, ...args]) => [
				Object.assign({}, options, {
					minify: false,

				}),
				...args
			])
		
		config.module
			.rule('images')
			.test(/\.(png|jpe?g|gif|ico)(\?.*)?$/)
			.use('url-loader')
			.loader('url-loader')
			.options({
				name: '[folder]/[name].[ext]',
				limit: -1,
				publicPath: (devMode) ? '' : 'http://s.nx.com/s2/game/closers/2020/events/200312_costume0iro4/',
				outputPath: '200312_costume0iro4'
			})

		// process.env.NODE_ENV가 development면, dist/index.html에 style.css, event.ui.js로 태그 삽입
		// process.env.NODE_ENV가 production이면, dist/index.html에 http://js.nx.com/~~/style.css, http://js.nx.com/~~/event.ui.js로 태그 삽입
		if (!devMode) {
			config
				.plugin('replace-string')
				.use(TextReplaceHtmlWebpackPlugin)
				.tap(([options, ...args]) => [
					Object.assign({}, options, {
						replacementArray: [
							{
								searchString: 'style.css',
								replace: 'http://js.nx.com/s3/closers/event/2020/200312_costume0iro4/style.css'
							},
							{
								searchString: 'event.ui.js',
								replace: 'http://js.nx.com/s1/closers/event/2020/200312_costume0iro4/event.ui.js'
							}
						]
					}),
					...args
				])
		}
		
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://webmw.nexon.com',
				changeOrigin: true
			}
		}
	}
}