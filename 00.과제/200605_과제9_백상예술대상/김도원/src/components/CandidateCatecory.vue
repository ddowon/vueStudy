<template>
	<div class="nominated-wrap" >
		<div class="container-inner">
			<ul class="nominnated-list">
				<li v-for="(item, idx) in categoryList" :key="item.PRIZE_NM"
				 	:class="[`prizeCd_${item.DIVISION}`, {on: idx === currentIdx}]">
					<a href="#" @click.prevent="changeCate(idx, item.DIVISION, item.PRIZE_CD, item.PRIZE_NM)" :id="item.PRIZE_CD">
						<span>{{item.PRIZE_NM}}</span>
					</a>
				</li>				
			</ul><!-- .nominnated-list -->
		</div><!-- .container-inner -->
	</div><!-- .nominated-wrap -->
</template>

<script>
	export default {
		name: '',
		props: ['categoryList'],
		data: () => ({
			currentIdx: 0
		}),
		methods: {
			changeCate(idx, division, cd, nm) {
				this.currentIdx = idx
				this.$emit('changeCate', division, cd, nm)
			}
		}
	}

</script>

