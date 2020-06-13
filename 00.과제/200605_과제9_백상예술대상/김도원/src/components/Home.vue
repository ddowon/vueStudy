<template>
	<Fragment>
		<Visual />
		<Dday :dday="`July 11, 2020 06:00:00`" />
		<Vod />
		<Sector />
		<LatestNotice />
	</Fragment>
</template>

<script>
	import { Fragment } from 'vue-fragment'
	import Visual from '@/components/Visual.vue'
	import Dday from '@/components/Dday.vue'
	import Vod from '@/components/Vod.vue'
	import Sector from '@/components/Sector.vue'
	import LatestNotice from '@/components/LatestNotice.vue'
	export default {
		name: 'home',
		components: {
			Fragment, Visual, Dday, Vod, Sector, LatestNotice
		}
	}
</script>
