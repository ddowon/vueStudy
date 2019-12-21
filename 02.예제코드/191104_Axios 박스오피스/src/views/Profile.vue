<template>
	<div class="profile">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<ProfileForm />
	</div>
</template>

<script>
import ProfileForm from '@/components/ProfileForm.vue'

export default {
	props: [ 'pageTitle' ],
	components: {
		ProfileForm
	}
}
</script>