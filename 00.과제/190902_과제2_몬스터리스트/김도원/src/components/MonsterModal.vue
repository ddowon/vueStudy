<template>
	<div v-if="isShowing">
		<div class="bg_modal">
		</div>
		<div class="modal">
			<div class="contents"> 
				<p> 몬스터 설명 : {{selectedMontser.desc}}</p>
			</div>
			<button class="btn_close" @click="closeModal">모달 닫기</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['selectedMontser', 'isShowing'],
	data: () => ({
		
	}),
	computed: {

	},
	methods: {

		closeModal () {
			this.isShowing = false;
			this.$emit('closeModal');
		}
	}
}
</script>
<style scoped>

	 .bg_modal { z-index: 10; position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5)}
	 .modal { z-index: 10; position: fixed; top: 50%; left: 50%; margin: -150px 0 0 -150px; width: 300px; height: 300px; background: white; border-radius: 50px; }
</style>
