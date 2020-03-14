import { mapState, mapActions } from 'vuex'

export default {
	data: () => ({
		top: 'auto'
	}),
	computed: {
		...mapState('ui', [
			'modal'
		]),
		zIdx() {
			return this.modal.order.findIndex(item => item === this.id)
		},
		inactive() {
			return this.modal.currentElement !== this.id
		},
		show() {
			return this.modal.order.includes(this.id)
		}
	},
	mounted() {
		window.addEventListener('resize', () => {
			this.setModalPosition()
		})
	},
	watch: {
		show(newVal, oldVal) {
			if (newVal) {
				this.setModalPosition()
			}
		}
	},
	methods: {
		...mapActions('ui', [
			'showModal', 'closeModal'
		]),
		setModalPosition() {
			if (this.show) {
				this.$nextTick(() => {
					const target = this.$refs[this.id]
					let targetHeight = target.clientHeight,
						min = 120,
						max = parseInt(document.documentElement.clientHeight || document.body.clientHeight),
						calTop = (max < targetHeight + min) ? min : (max - targetHeight) / 2
	
					this.top = `${calTop + 62}px`
					this.loaded = true
				})
			}
		}
	}
}
