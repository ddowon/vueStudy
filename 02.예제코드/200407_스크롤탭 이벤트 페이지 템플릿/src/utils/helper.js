const helper = {
	getChannel() {
		return window.location.href.toLowerCase().match('naver') ? 'NAVER' : 'NEXON'
	},
	addMultipleEventListener(element, events, handler, opts) {
		events.split(' ').forEach(event => element.addEventListener(event, handler, opts))
	},
	removeMultipleEventListener(element, events, handler, opts) {
		events.split(' ').forEach(event => element.removeEventListener(event, handler, opts))
	},
	preventDefault (e) {
		e = e || window.event
		if (e.preventDefault)
			e.preventDefault()
		e.returnValue = false
	},
	preventDefaultForScrollKeys(e) {
		let keys = {37: 1, 38: 1, 39: 1, 40: 1}
		if (keys[e.keyCode]) {
			e.preventDefault()
			return false
		}
	}
}

export default helper