<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardView :id="id" board-id="notice" />
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
	}),
	created() {
	},
	methods: {
	}
}
</script>
