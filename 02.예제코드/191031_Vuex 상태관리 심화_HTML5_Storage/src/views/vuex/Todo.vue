<template>
	<div>
		<TodoInput />
		<TodoList />
	</div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
import TodoInput from '@/components/TodoInput.vue'

export default {
	components: {
		TodoList,
		TodoInput
	}
}
</script>
