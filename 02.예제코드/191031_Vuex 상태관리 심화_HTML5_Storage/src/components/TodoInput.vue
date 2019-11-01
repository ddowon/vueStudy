<template>
	<div class="ipt_box">
		<input ref="todoInput" type="text" v-model="newTitle" @keyup.enter="addItem" placeholder="할 일을 입력하세요.">
		<button @click="addItem" :class="{active: newTitle}">추가</button>
	</div>
</template>

<script>
export default {
	data: () => ({
		newTitle: ''
	}),
	created() {
		this.$nextTick(() => {
			this.$refs.todoInput.focus()
		})
	},
	methods: {
		addItem() {
			this.$store.dispatch('todo/addItem', this.newTitle)
			.then((res) => {
				console.log(res)
				this.clearInput()
			})
			.catch((err) => {
				console.log(err)
			})
		},
		clearInput() {
			this.newTitle = ''
		}
	}

}
</script>

<style scoped>
.ipt_box {
	width:360px;height:50px;margin:0 auto;
	margin-bottom:20px;
}
.ipt_box input {
	float:left;
	width:250px;padding:0 15px;
	font-size: 0.9rem;
	box-shadow:0 1px 3px rgba(50, 50, 93, .15), 0 1px 0 rgba(0, 0, 0, .02)
}
.ipt_box button {
	float:right;
	padding:0 20px;
	color:#fff;
	background-color:#5e72e4;
	box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
	cursor:pointer
}
.ipt_box button.active {
	background-color:#172b4d;
	box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)
}
.ipt_box input, .ipt_box button {
	display:block;
	border:0;outline:0;
	height:50px;line-height:50px;border-radius:10px;
}
</style>
