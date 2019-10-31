<template>
	<div>
		<div class="btn_list_wrap">
			<button class="all" :class="{ active: current === 'all' }" @click="filterItem('all')">전체</button>
			<button class="done" :class="{ active: current === 'done' }" @click="filterItem('done')">완료</button>
			<button class="yet" :class="{ active: current === 'yet' }" @click="filterItem('yet')">미완료</button>
		</div>
		<ul class="list_wrap">
			<li v-for="(item, idx) in getTodoList" :key="idx" :class="{ done: item.done }">
			<div>
				<input type="checkbox" :id="`itemCheck${item.id}`" v-model="item.done" @click="toggleItem(item.id)">
				<label :for="`itemCheck${item.id}`" ></label>
			</div>
			<div>{{ idx + 1 }}. </div>
			<div class="title">{{ item.title }}</div>
			<div class="btn_wrap">
				<button type="button" class="btn_edit" @click="setModal(item, 'edit')"><i class="el-icon-edit"></i>수정하기</button>
				<button type="button" class="btn_delete" @click="setModal(item, 'delete')"><i class="el-icon-delete"></i>삭제하기</button>
			</div>
			</li>
		</ul>
		<button class="btn_delete_all" @click="resetItems">전체삭제</button>
		<div class="search">
			<input type="text" v-model="searchKeyword" @keyup.enter="searchList(searchKeyword)">
			<button class="btn_search" @click="searchList(searchKeyword)">찾기</button>
		</div>
		<Modal v-show="isModalShowing">
			<template slot="body">
				<div v-if="type === 'edit'">
					<p>수정 하시겠습니까?</p>
					<input type="text" placehodler="수정할 내용을 입력하세요." v-model="selectedItem.title">
					<button @click="editItem(selectedItem.id)" class="btn_edit">수정하기</button>
				</div>
				<div v-else-if="type === 'delete'">
					<p>삭제 하시겠습니까?</p>
					<button @click="deleteItem(selectedItem.id)" class="btn_delete">삭제하기</button>
				</div>
			</template>
		</Modal>
	</div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Modal from '@/components/common/Modal.vue'

export default {
	components: {
		Modal
	},
	data: () => ({
		type: '', 
		selectedItem: {},
		searchKeyword: ''
	}),
	computed: {
		...mapState([
			'isModalShowing', 'todoList', 'searchedList', 'current'
		]),
		...mapGetters([
			'getTodoList', 'getSearchedList'
		])
	},
	methods: {
		...mapMutations([
			'openModal', 'closeModal', 'searchList', 'toggleItem', 'filterItem', 'resetItems'
		]),
		setModal(item, type) {
			this.type = type
			this.selectedItem = item
			this.openModal()
		},
		editItem(idx) {
			let editItem = this.selectedItem.title
			this.$store.dispatch('editItem', {
				idx,
				editItem,
				callback: () => {
					this.closeModal()
				}
			})
		},
		deleteItem(idx) {
			this.$store.dispatch('deleteItem', {
				idx,
				callback: () => {
					this.closeModal()
				}
			})
		}
	}
}
</script>

<style scoped>
  .list_wrap li > div { display: inline }
  .list_wrap .done { color: #ccc; text-decoration: line-through}
</style>
