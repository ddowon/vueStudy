<template>
	<div class="view_cont">
		<template>
			<div class="view_cont_txt" v-html="item.contents">
			</div>
			<!-- 보시면 files가 
			한 게시글에 첨부파일이 2개일 수도 있잖아요? 지금 저희는 구현을 글쓰기에 1개만 넣어놨지만요.
			db상에는 첨부파일이 여러개일수도 있으니.. files[] array로 되어 있어요.
			그래서 v-if에 item.files.length 처리를 한 후에, 첨부파일이 있으면 img를 v-for로 돌려돌려 아시쥬? 그리고 alt값에는 item.title 넣어주시고 고고고고고고ㅗ고곡고 -->
			<div v-if="item.files.length" class="view_cont_img">
				<img :src="img.url" :alt="item.title" v-for="img in item.files" :key="img.path">
			</div>
		</template>
	</div>
</template>

<script>
export default {
	props: [ 'item' ],
	components: {
	},
	data: () => ({
	}),
	watch: {
	},
	created() {
	},
	methods: {
	}
}
</script>