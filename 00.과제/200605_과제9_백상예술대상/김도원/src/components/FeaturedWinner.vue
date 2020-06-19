<template>
	<div class="awards-prize" v-if="featuredWinner">
		<div class="awards-prize-con">
			<span class="list-thumb" :style="`background:url() no-repeat; background-size:100% 100%;`">
				<img :src="featuredWinner.PHOTO_URI" alt="">
			</span>
			<span class="title">
				<strong class="title-prize">{{ featuredWinner.PRIZE_NM }}</strong>
				<em>{{ featuredWinner.PROGRAM_NM }}</em>
				<span class="name">{{ featuredWinner.NAME }}</span>
			</span>
		</div>
	</div>
</template>

<script>
export default {
	props: ['featuredWinner'],
	data:() => ({
	
	}),
	computed: {
		
	},
	created() {
		
	},
	mounted() {

	},
	methods: {
	
	}
}

</script>