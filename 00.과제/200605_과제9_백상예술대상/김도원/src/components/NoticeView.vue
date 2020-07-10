<template>
	<div class="tlb-wrap">
		<div class="container-inner">
			<BoardView :id="id" board-id="notice" />
			<!-- 글보기 데이터 도원님이 구현할 부분 -->
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
