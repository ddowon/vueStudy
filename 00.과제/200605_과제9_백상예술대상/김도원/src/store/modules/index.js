const storeModuleFiles = require.context('.', false, /\.store\.js$/)
const modules = {}

storeModuleFiles.keys().forEach((filename) => {
	if (filename === './index.js') {
		return
	}

	const moduleName = filename.replace(/(\.\/|\.store\.js)/g,'').replace(/^\w/, c => c.toLowerCase())

	modules[moduleName] = storeModuleFiles(filename).default || storeModuleFiles(filename)
})

export default modules