<template>
	<div class="nominee-list-wrap">
		<div class="container-inner">
			<div class="nominee-award-sector sector-title">
				<strong class="nominee-award">{{currentCategory}}</strong>
				<span class="nominee-sector sector01" id="sector_tv" v-if="currentdivision==='tv'">TV부문</span>
				<span class="nominee-sector sector02" id="sector_movie" v-else-if="currentdivision==='movie'">영화부문</span>
				<span class="nominee-sector sector03" id="sector_play" v-else-if="currentdivision==='play'">연극부문</span>
			</div>
			<ul class="nominee-list">
				<li v-for="item in list" :key="item.title">
					<span class="list-thumb">
						<img :src="item.PHOTO_URI" alt="">
					</span>
					<div class="title"> <strong>{{item.PROGRAM_NM}}</strong> <span class="name">{{item.NAME}}</span> </div>
				</li>
			</ul>
		</div><!-- .container-inner -->
	</div><!-- nominee-list-wrap -->
</template>

<script>
	export default {
		name: '',
		props: ['list', 'currentCategory', 'currentdivision'],
		data: () => ({
		}),
		methods: {
			
		}
	}

</script>

