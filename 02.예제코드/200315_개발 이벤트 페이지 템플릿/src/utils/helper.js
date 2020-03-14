const helper = {
	// TODO: 모바일 체크 확인 필요
	getDevice() {
		return 'PC'
	},
	getChannel() {
		return window.location.href.toLowerCase().match('naver') ? 'NAVER' : 'NEXON'
	},
	reflectKeys(arr = [], prefix) {
		arr.reduce((obj, key) => {
			const value = prefix ? prefix + ' ' + key : key
			obj[key] = value
	
			return obj
		}, {})
	},
	findItemIndex(items, id) {
		return items.findIndex(item => item.id === id)
	},
	byteCount(str) {
		return encodeURI(str).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1
	},
	shareSNS(service, title, url) {
		let popupWidth = 1024
		let popupHeight = 800
		let SNSURL = ''
		let popupScroll = 'yes'

		title = title.replace('<', '&lt')
		title = title.replace('>', '&gt')

		switch (service) {
			case 'facebook':
				SNSURL = 'http://www.facebook.com/sharer.php?t=' + encodeURIComponent(title) + '&u=' + encodeURIComponent(url)
				popupWidth = 800
				popupHeight = 400
				break

			case 'twitter':
				SNSURL = 'https://twitter.com/intent/tweet?&text=' + encodeURIComponent(title) + '&url=' + escape(url)
				popupWidth = 800
				popupHeight = 400
				break
		}

		window.open(SNSURL, service, 'width=' + popupWidth + ', height=' + popupHeight + ',resizable=yes,scrollbars=' + popupScroll)
	}
}

export default helper