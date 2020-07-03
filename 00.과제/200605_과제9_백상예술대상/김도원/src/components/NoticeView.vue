<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardView 
				:item="noticeData" />
		</div>
	</div>
</template>

<script>
	import BoardView from '@/components/board/BoardView.vue'

	export default {
		components: {
			BoardView
		},
		props: [ 'id' ],
		data: () => ({
			// 도원님 공간
		}),
		watch: {
			// 도원님 공간
		},
		created() {
			// 도원님 공간
		},
		methods: {
			fetchItemById(id = 1) {
				// 도원님 공간
			}
		}
	}
</script>
