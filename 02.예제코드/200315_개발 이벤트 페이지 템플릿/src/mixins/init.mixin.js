export default {
	data: () => ({
		clientWidth: parseInt(document.documentElement.clientWidth || document.body.clientWidth),
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
			let width = (this.clientWidth % 2 != 0) ? this.clientWidth - 1 : this.clientWidth
			return `${width}px`
		}
	},
	methods: {
		handleContentsSize() {
			this.clientWidth = parseInt(document.documentElement.clientWidth || document.body.clientWidth)
		}
	}
}