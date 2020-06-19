<template>
	<div class="awards-awarded" v-if="winnerList">
		<ul class="awarded-list" >
			<li v-for="(item, index) in winnerList" :key="index">
				<span class="list-thumb"><img :src="item.PHOTO_URI" alt=""></span>
				<span class="title">
					<strong class="title-prize">{{item.PRIZE_NM}}</strong>
					<em>{{item.NAME}}</em>
					<span class="name">{{item.PROGRAM_NM}}</span>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['winnerList'],
	components: {
		
	},
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