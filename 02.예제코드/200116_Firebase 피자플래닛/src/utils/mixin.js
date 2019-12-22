const formatNumber = {
	filters: {
		currency(val) {
			if (!val) return ''
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'
		}
	}
}

export {
	formatNumber
}