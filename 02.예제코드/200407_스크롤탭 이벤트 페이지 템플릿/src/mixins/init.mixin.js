export default {
	data: () => ({
		winWidth: parseInt(document.documentElement.clientWidth || document.body.clientWidth),
		winHeight: parseInt(document.documentElement.clientHeight || document.body.clientHeight)
	}),
	created() {
		window.addEventListener('resize', this.handleContentsSize)
	},
	mounted() {
		this.handleContentsSize()
	},
	destroyed() {
		window.removeEventListener('resize', this.handleContentsSize)
	},
	computed: {
		contentsWidth() {
			let width = (this.winWidth % 2 != 0) ? this.winWidth - 1 : this.winWidth
			return `${width}px`
		}
	},
	methods: {
		handleContentsSize() {
			this.winWidth = parseInt(document.documentElement.clientWidth || document.body.clientWidth)
		}
	}
}