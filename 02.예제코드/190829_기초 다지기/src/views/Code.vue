<template>
	<div class="code">
		<h1>예제코드 모음</h1>
		<el-divider></el-divider>

		<Lifecycle/>
		<el-divider></el-divider>

		<Inputbox/>
		<el-divider></el-divider>

		<VForDirective/>
		<el-divider></el-divider>

		<ListParent/>
	</div>
</template>

<script>
import Lifecycle from '@/components/playground/Lifecycle.vue'
import Inputbox from '@/components/playground/Inputbox.vue'
import VForDirective from '@/components/playground/VForDirective.vue'
import ListParent from '@/components/playground/ListParent.vue'

export default {
	components: {
		Lifecycle,
		Inputbox,
		VForDirective,
		ListParent
	}
}
</script>
