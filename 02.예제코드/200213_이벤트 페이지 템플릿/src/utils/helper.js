const reflectKeys = (arr = [], prefix) => {
	arr.reduce((obj, key) => {
		const value = prefix ? prefix + ' ' + key : key
		obj[key] = value

		return obj
	}, {})
}

const findItemIndex = (items, id) => items.findIndex(item => item.id === id)

export {
	reflectKeys,
	findItemIndex
}