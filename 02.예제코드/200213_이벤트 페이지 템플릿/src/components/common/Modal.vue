<template>
	<transition name="fade">
	<div :id="id" class="modal" :class="{ 'loaded': loaded, 'inactive': inactive }" :style="`z-index:${300 + zIdx}`" v-show="show" @click.self.prevent="closeModal(id)">
		<div :ref="id" class="modal-container" :style="`top:${top}`">
			<button type="button" class="modal-btn-close" @click="closeModal(id)">닫기</button>
			<div class="modal-body">
				<slot name="body"></slot>
			</div>
			<div class="modal-footer">
				<slot name="footer"></slot>
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
import modalMixin from '@/mixins/modal.mixin'

export default {
	name: 'modal',
	mixins: [ modalMixin ],
	props: {
		id: {
			type: String,
			required: true
		}
	}
}
</script>

<style>
body.locked-scroll {height:100%;padding-right:16px;overflow:hidden}
.modal {position:fixed;top:0;left:0;width:100%;height:100%;text-align:center;overflow-y:auto;z-index:300}
.modal .modal-btn-close {position:absolute;top:-46px;right:0;width:34px;height:34px;background:url('http://s.nx.com/s2/game/sky/event/200206_vtday_11i15/btns/btn_close.png') no-repeat 0 0;cursor:pointer;outline:none}
.modal .modal-btn-ok {position:absolute}
.modal .modal-container {opacity:0;position:relative;display:inline-block;transition:opacity 400ms ease, top 500ms ease}
.modal .modal-footer {position:absolute}
.modal.loaded .modal-container {opacity:1}
.modal.inactive .modal-container:after {content:'';display:block;position:absolute;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:0.7}
.modal.inactive .modal-btn-close {display:none}
.modal-bg {position:fixed;z-index:299;top:0;left:0;width:100%;height:100%;background-color:#000;opacity:0.8}
.fade-enter-active, .fade-leave-active {transition:opacity 300ms ease, transform 300ms 50ms ease}
.fade-enter, .fade-leave-to {opacity:0;transform:translateY(30px)}
</style>