<template>
	<div class="nominated-wrap" >
		<div class="container-inner">
			<ul class="nominnated-list">
				<li v-for="item in prizeList" :key="item.PRIZE_NM"
				 	:class="[ `prizeCd_${item.DIVISION}`, { on: item.PRIZE_CD === currentPrize } ]">
					<a href="#" @click.prevent="changePrize(item.PRIZE_CD)" :id="item.PRIZE_CD">
						<span>{{ item.PRIZE_NM }}</span>
					</a>
				</li>
			</ul><!-- .nominnated-list -->
		</div><!-- .container-inner -->
	</div><!-- .nominated-wrap -->
</template>

<script>
export default {
	props: [ 'prizeList', 'currentPrize' ],
	methods: {
		changePrize(cd) {
			this.$emit('changePrize', cd)
		}
	}
}
</script>