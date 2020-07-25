const appCookie = {
	getCookie(cname) {
		let value = document.cookie.match('(^|;) ?' + cname + '=([^;]*)(;|$)')
		return value ? value[2] : null
	},
	setCookie(cname, value, expireDays) {
		let todayDate = new Date()
		todayDate.setDate(todayDate.getDate() + expireDays);
		document.cookie = cname + "=" + escape(value) + "; path=/; expires=" + todayDate.toUTCString() + ";";
	},
	deleteCookie(cname) {
		document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
	},
	deleteAllCookie() {
		let decodedCookie = decodeURIComponent(document.cookie)
		let ca = decodedCookie.split(';')
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i]
			let cname = c.split('=')[0]
			this.deleteCookie(cname)
		}
	}
}

export default appCookie