<template>
	<div class="tb_view">
		<BoardViewHeader />
		<BoardViewContents />
		<BoardViewFooter />
	</div>
</template>

<script>
import BoardViewHeader from '@/components/board/BoardViewHeader.vue'
import BoardViewContents from '@/components/board/BoardViewContents.vue'
import BoardViewFooter from '@/components/board/BoardViewFooter.vue'

export default {
	components: {
		BoardViewHeader, BoardViewContents, BoardViewFooter
	},
	props: [ 'item' ],
	data: () => ({
	}),
	watch: {
	},
	created() {
	},
	methods: {
	}
}
</script>