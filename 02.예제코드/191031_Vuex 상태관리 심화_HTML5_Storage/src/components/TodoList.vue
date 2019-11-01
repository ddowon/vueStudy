<template>
	<section>
		<div class="btns">
			<button :class="{active: current == 'all'}" @click="filterItem('all')">전체보기</button>
			<button class="done" :class="{active: current == 'done'}" @click="filterItem('done')">완료목록</button>
			<button class="yet" :class="{active: current == 'yet'}" @click="filterItem('yet')">미완료목록</button>
			<button class="clear" @click="clearItem">전체삭제</button>
		</div>
		<Todo-List-Item/>
		<Todo-Search/>
	</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TodoListItem from '@/components/TodoListItem.vue'
import TodoSearch from '@/components/TodoSearch.vue'

export default {
	components: {
		TodoListItem, TodoSearch
	},
	computed: {
		...mapState('todo', [
			'current'
		])
	},
	methods: {
		...mapMutations('todo', [
			'filterItem', 'clearItem'
		])
	}
}
</script>

<style scoped>
section {
	background-color: #f5f7f9;
    border: 1px solid #e6ecf1;
    padding: 1.25rem;
    border-radius: .25rem;
}
.btns {
	overflow:hidden;
}
.btns > button {
	display:block;
	float:left;
	height:35px;
	line-height:35px;
	margin-right:8px;
	padding:0 16px;
	color: #fff;
	border:0;outline:0;border-radius:5px;
	background-color: #11cdef;
    border-color: #11cdef;
	box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
	cursor:pointer;
}
.btns > button.done {
	background-color: #2dce89;
	border-color: #2dce89;
}
.btns > button.yet {
	background-color: #f5365c;
	border-color: #f5365c;
}
.btns > button.clear {
	color:#212529;
	background-color: #e1e3e6;
	border-color: #e1e3e6;
}

/* transition css */
.list-enter-active, .list-leave-active {
	transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateY(30px);
}
.clearAllContainer {
	width: 8.5rem;
	height: 50px;
	line-height: 50px;
	background-color: white;
	border-radius: 5px;
	margin: 0 auto;
}
.clearAllBtn {
	color: #e20303;
	display: block;
}
</style>
