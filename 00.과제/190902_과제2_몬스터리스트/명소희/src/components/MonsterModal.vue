<template>
	<div class="modal">
		<dl>
			<dt><strong>이름</strong></dt>
			<dd>{{ monster.name }}</dd>
			<dt><strong>나이</strong></dt>
			<dd>{{ monster.age }}</dd>
			<dt><strong>설명</strong></dt>
			<dd>{{ monster.desc }}</dd>
		</dl>
		<p class="btn close" @click="modalClose"><button type="button">닫기</button></p>
	</div>

</template>

<script>
export default {
	props: ['monster'],
	methods: {
		modalClose() {
			this.$emit('close')
		}
	}
}
</script>

<style scoped>
	div {z-index:100; margin:-250px 0 0 -250px; position:absolute; left: 50%; top: 50%; width :500px; height:500px; background:#fff; border:1px solid #ccc;}
	.close {position: absolute; right: 0; top: 0; width: 50px; height: 50px; background:#ccc;}
	.close button {width: 100%; height: 100%; display: block; text-indent: -9999px;}
</style>