<template>
	<div class="login">
		<h1>{{ pageTitle }}</h1>
		<el-divider></el-divider>
		<LoginForm />
	</div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
	props: [ 'pageTitle' ],
	components: {
		LoginForm
	}
}
</script>