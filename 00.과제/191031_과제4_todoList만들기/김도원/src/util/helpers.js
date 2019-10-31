const fn = {
    findListById(target, id) {
        return target.findIndex( list => {
            return list.id === id
        })
    }
}

export default fn