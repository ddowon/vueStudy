<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardWriteForm :item="item"/>
		</div>
	</div>
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI
import { mapGetters, mapActions, mapState } from 'vuex'

import BoardWriteForm from '@/components/board/BoardWriteForm.vue'

export default {
	props: [ 'id' ],
	components: {
		BoardWriteForm
	},
	data: () => ({
		item: null
	}),
	watch: {
	},
	computed: {
		
	},
	created() {
		this.fetchItem(this.id)
	},
	methods: {
		fetchItem(id) {
			this.axios.get(`${API_URI}/notice/${id}`)
			.then((res) => {
				if (res.data) {
					this.item = res.data.itemsList[0]
					// console.log(this.item)
				}
			}).catch((err) => {
				console.log(err)
			})


		}
	}
}
</script>