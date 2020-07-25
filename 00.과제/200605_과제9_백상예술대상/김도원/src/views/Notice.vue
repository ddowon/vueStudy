<template>
	<div class="notice-page">
		<!--
			공지사항, 백상예술대상의 ~ 전해드립니다. 마크업은 공지사항 글 목록/글 보기/글 쓰기/글 수정 모든 페이지에서 동일하게 사용
			따라서 중복되는 부분은 views/Notice.vue에 두고 router-view를 한 번 더 사용
			App.vue의 router-view에서 1차 라우트를 렌더링 하듯, @/views/Notice.vue에서 공지사항의 children 라우트를 렌더링

			중복되는 부분을 Header.vue처럼 컴포넌트화 해도 무방하나, 특별한 기능이 없고 텍스트 영역이므로 children router-view를 활용하도록 함)
		-->
		<div class="notice-title-wrap sub-title">
			<div class="container-inner">
				<h2>공지사항</h2>
			</div>
		</div>
		<div class="notice-title sector-title">
			<div class="container-inner">
				<strong>백상예술대상의 새로운 소식을 전해드립니다.</strong>
			</div>
		</div>

		<!-- Notice 하위 children 라우트들은 아래 router-view 컴포넌트에 렌더링 됨 -->
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'notice'
}
</script>
