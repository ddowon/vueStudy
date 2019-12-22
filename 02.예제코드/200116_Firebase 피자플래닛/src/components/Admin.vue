<template>
	<div>
		<pp-admin-hidden v-if="currentUser"></pp-admin-hidden>
	</div>
</template>

<script>
const AdminHidden = () => import('./AdminHidden.vue')
import { mapGetters } from 'vuex'

export default {
	components: {
		ppAdminHidden: AdminHidden
	},
	computed: {
		...mapGetters([
			'currentUser'
		])
	}
}
</script>

<style>
.order-number {
	margin: 10px 0;
}
</style>