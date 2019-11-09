<template>
	<section>
		<ul>
			<li v-for="(item, index) in getTodoList" :key="item.id" :class="{ complete: item.done }">
				<div>
					<input type="checkbox" :id="`itemCheck${item.id}`" v-model="item.done" @change="toggleItem">
					<label :for="`itemCheck${item.id}`" >{{ `${index + 1}.${item.title}` }}</label>
				</div>
				<div class="btn_wrap">
					<button type="button" class="btn_edit" @click="setModal(item, 'edit')"><i class="el-icon-edit"></i>수정하기</button>
					<button type="button" class="btn_delete" @click="setModal(item, 'delete')"><i class="el-icon-delete"></i>삭제하기</button>
				</div>
			</li>
		</ul>
		<Modal v-show="isModalShowing">
			<template slot="body">
				<div v-if="type === 'edit'">
					<p>수정 하시겠습니까?</p>
					<input ref="editForm" :value="selectedItem.title" type="text" placehodler="수정할 내용을 입력하세요." @keyup.enter="editItem(selectedItem.id)">
					<button @click="editItem(selectedItem.id)" class="btn_edit">수정하기</button>
				</div>
				<div v-else-if="type === 'delete'">
					<p>삭제 하시겠습니까?</p>
					<button @click="removeItem(selectedItem.id)" class="btn_delete">삭제하기</button>
				</div>
			</template>
		</Modal>
	</section>
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
		selectedItem: {}
	}),
	computed: {
		...mapState('todo', [
			'isModalShowing'
		]),
		...mapGetters('todo', [
			'getTodoList'
		])
	},
	methods: {
		...mapMutations('todo', [
			'openModal', 'closeModal', 'toggleItem'
		]),
		setModal(item, type) {
			this.type = type
			this.selectedItem = item
			this.openModal()
		},
		editItem(id) {
			this.$store.dispatch('todo/editItem', { id, newTitle: this.$refs.editForm.value })
			.then((res) => {
				console.log(res)
				this.closeModal()
			}).catch((err) => {
				console.log(err)
			})
		},
		removeItem(id) {
			console.log(id)
			this.$store.dispatch('todo/removeItem', id)
			.then((res) => {
				console.log(res)
				this.closeModal()
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
}
</script>

<style scoped>
section {
    margin-top: 1em;
	padding: 0 !important;
}
ul {
	clear:both;
	list-style-type: none;
	padding-left: 0px;
	margin-top: 10px;
	text-align: left;
}
li {
	display: flex;
	min-height: 50px;
	height: 50px;
	line-height: 50px;
	margin: 0.5rem 0;
	padding: 0 0.9rem;
	background: #2e2e2e;
	border-radius: 5px;
	cursor:pointer;
}
.checkBtn {
	line-height: 45px;
	color: #62acde;
	margin-right: 5px;
}
.checkBtnCompleted {
	color: #b3adad;
}
.textCompleted {
	text-decoration: line-through;
	color: #b3adad;
}
.removeBtn {
	margin-left: auto;
	color: #de4343;
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
