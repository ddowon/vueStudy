const findListById = (items, id) => {
	return items.findIndex(item => item.id === id)
}

export {
	findListById
}