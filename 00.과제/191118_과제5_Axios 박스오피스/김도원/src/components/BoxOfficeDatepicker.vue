<template>
	<div class="movie-search">
		<el-date-picker
			@change="changeDate"
			v-model="pickDate" type="date" value-format="yyyy-MM-dd" :clearable="false" placeholder="날짜를 선택하세요.">
		</el-date-picker>
	</div>
</template>

<script>
export default {
	props: [ 'date' ],
	data: () => ({
		pickDate: ''
	}),
	created() {
		this.pickDate = this.date
	},
	methods: {
		changeDate() {
			this.$emit('change', this.pickDate)
		}
	}
}
</script>

<style lang="scss" scoped>
.movie-search {
	float: left;
}
</style>
