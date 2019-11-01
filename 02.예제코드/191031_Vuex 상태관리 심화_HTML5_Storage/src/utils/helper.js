const findListById = (items, id) => {
	return items.findIndex(item => item.id === id)
}
const fetchLocalStorage = (keyName) => {
	return JSON.parse(localStorage.getItem(keyName))
}
const saveLocalStorage = (keyName, items) => {
	localStorage.setItem(keyName, JSON.stringify(items))
}

export {
	findListById,
	fetchLocalStorage,
	saveLocalStorage
}