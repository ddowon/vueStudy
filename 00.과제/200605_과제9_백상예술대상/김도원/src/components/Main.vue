<template>
	<Fragment>
		<Visual/>
		<Dday/>
		<Vod/>
		<Sector/>
		<Notice/>
	</Fragment>
</template>

<script>
	import { Fragment } from 'vue-fragment'
	import Visual from '@/components/Visual.vue'
	import Dday from '@/components/Dday.vue'
	import Vod from '@/components/Vod.vue'
	import Sector from '@/components/Sector.vue'
	import Notice from '@/components/Notice.vue'
	export default {
		name: 'Main',
		components: {
			Fragment, Visual, Dday, Vod, Sector, Notice
		},
		props: {
		}
	}

</script>
