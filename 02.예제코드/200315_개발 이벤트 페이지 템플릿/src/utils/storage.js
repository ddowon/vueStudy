class AppStorage {
	constructor(storage) {
		this.storage = storage || window.localStorage

		if (!this.isSupported()) {
			throw new Error('Storage를 지원하지 않는 브라우저입니다.')
		}
	}

	setItem(key, value) {
		this.storage.setItem(key, JSON.stringify(value))
	}

	getItem(key) {
		return JSON.parse(this.storage.getItem(key))
	}

	removeItem(key) {
		this.storage.removeItem(key)
	}

	removeAllItems() {
		Object.keys(this.storage).map((key) => {
			this.storage.removeItem(key)
		})
	}

	clear() {
		this.storage.clear()
	}

	isSupported() {
		let supported = true

		if (!this.storage) {
			supported = false
		}

		return supported
	}
}

const appLocalStorage = new AppStorage()
const appSessionStorage = new AppStorage(window.sessionStorage)

export {
	appLocalStorage,
	appSessionStorage
}