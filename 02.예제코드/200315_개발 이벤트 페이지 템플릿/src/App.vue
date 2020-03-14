<template>
	<div id="wrap">
		<Side-Banner />
		<!-- <Contents :key="foreUpdate" /> -->
		<Contents />
	</div>
</template>
<script>
import SideBanner from '@/components/SideBanner.vue'
import Contents from '@/components/Contents.vue'

export default {
	name: 'App',
	components: { SideBanner, Contents }
}
</script>