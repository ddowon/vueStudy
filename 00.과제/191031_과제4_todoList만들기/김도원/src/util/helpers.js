const fn = {
	findListById(target, id) {
		return target.findIndex(list => list.id === id)
	}
}

export default fn