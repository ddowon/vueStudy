<template>
	<div>
		<div class="modal_wrap">
			<div class="contents">
				<slot name="body">
					기본 모달 body
				</slot>
			</div>
			<button class="btn_close" @click="closeModal"><i class="el-icon-close"></i><span>모달 닫기</span></button>
		</div> 
		<div class="overlay"></div>
	</div>
</template>

<script>
export default {
	methods: {
		closeModal() {
			this.$store.commit('todo/closeModal')
		}
	}
}
</script>

<style scoped>
.modal_wrap { z-index: 10; position: absolute; top: 50%; left: 50%; margin: -150px 0 0 -200px; width: 400px; height: 300px; background: #fff; border-radius: 20px }
.overlay { z-index: 9; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5)}
.modal_wrap .btn_edit,
.modal_wrap .btn_delete { width: 100px; height: 50px; border: none; border-radius: 10px; border: 1px solid gray}
.modal_wrap .btn_close { position: absolute; top: 0; right: 0;  width: 50px; height: 50px;}
.modal_wrap .btn_close span { display: inline-block; text-indent: -9999px }
.modal_wrap .btn_close i { display: block; width: 100%; height: 100%; }
</style>
