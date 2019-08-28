<template>
	<div class="hello">
		<h2>간단 북마크 안내</h2>
		<br>
		<p>LocalStorage를 활용한 간단 북마크입니다.</p>
		<p>브라우저 쿠키 및 캐시를 삭제하지 않는 한 북마크 데이터가 영구 보존됩니다.</p>	
	</div>
</template>

<script>
export default {
	name: 'Greeting',
	data : () => ({
		message : "hi?",
		age : '3',
		itemList : [
			{ name : '사과', key: 'red'},
			{ name : '배'},
			{ name : '바나나'},
			{ name : '과자'}
		],
		isShowing : false,
		message1 : "보인다",
		message2 : "안보인다"
	}),
	methods : {
		handleClick(){
			this.message = 'HIHI!'
		},
		sayHi(){

		},
		toggle(){
			this.isShowing = !this.isShowing
		}
	}
}
</script>
