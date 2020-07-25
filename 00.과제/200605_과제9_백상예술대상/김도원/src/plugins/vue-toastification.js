import Vue from 'vue'
import Toast, { TYPE } from 'vue-toastification'

import 'vue-toastification/dist/index.css'

const toastOptions = {
	position: 'top-center',
	maxToasts: 1,
	transitionDuration: 600,
	timeout: 2000,
	transition: 'Vue-Toastification__fade',
	newestOnTop: true,
	filterBeforeCreate: (toast, toasts) => {
		if (toasts.filter((t) => t.type === toast.type || t.content === toast.content).length !== 0) {
			return false
		}
		return toast
	},
	toastDefaults: {
		[TYPE.ERROR]: {
			closeButton: false
		},
		[TYPE.SUCCESS]: {
			closeButton: false,
			hideProgressBar: true
		}
	}
}

Vue.use(Toast, toastOptions)