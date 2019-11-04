<template>
	<div>
		<h2>일별 박스오피스 가져오기 연습</h2>
		<button type="button" @click="fetchItems">데이터 가져오기</button>
		<p v-if="items">
			{{ items }}
		</p>
	</div>
</template>

<script>
export default {
	data: () => ({
		items: null
	}),
	methods: {
		fetchItems() {
			this.axios.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=3549202564fc55c0fb1f6709f54aaeaf&targetDt=20191103')
			.then((res) => {
				// 서버로부터 정상적으로 응답이 왔을 때 실행
				console.log(res)
				this.items = res
			})
			.catch((err) => {
				// 서버로부터 응답이 정상적으로 처리되지 못했을 때 실행
				console.log(err)	
			})
		}
	}
}
</script>

<style scoped>
button {
	display:block;
	border:0;outline:0;
	height:50px;line-height:50px;border-radius:10px;
	padding:0 20px;
	color:#fff;
	background-color:#5e72e4;
	box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
	cursor:pointer
}
button:hover {
	background-color:#172b4d;
	box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)
}
</style>
