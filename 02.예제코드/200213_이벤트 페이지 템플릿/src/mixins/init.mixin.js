export default {
	data: () => ({
		windowWidth: 'auto',
		isPageLoaded: false,
	}),
	created() {
		window.addEventListener('resize', () => {
			this.handleWindowResize()
		})
	},
	computed: {
		contentsWidth() {
			if (this.isPageLoaded) {
				this.windowWidth = parseInt(document.documentElement.clientWidth || document.body.clientWidth)
				let width = (this.windowWidth % 2 != 0) ? this.windowWidth - 1 : this.windowWidth
				return `width:${width}px`
			} else {
				return 'auto'
			}
		}
	},
	methods: {
		handleWindowResize() {
			this.windowWidth = parseInt(document.documentElement.clientWidth || document.body.clientWidth)
		}
	},
}