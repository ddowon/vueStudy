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

import Visual from '@/components/home/Visual.vue'
import Dday from '@/components/home/Dday.vue'
import Vod from '@/components/home/Vod.vue'
import Sector from '@/components/home/Sector.vue'
import LatestNotice from '@/components/home/LatestNotice.vue'

export default {
	name: 'home',
	components: {
		Fragment, Visual, Dday, Vod, Sector, LatestNotice
	}
}
</script>