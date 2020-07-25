<template>
	<div class="null-page">
		<div class="container-inner">
			<img class="img-null" src="http://images.jtbc.joins.com/baeksang/2020/404.png" alt="page not found 페이지를 표시할 수 없습니다.">
			<p class="hidden">서비스 이용에 불편을 드려 죄송합니다. 찾으시려는 페이지가 삭제되었거나 일시적으로 이용하실 수 없습니다. 입력하신 페이지 주소가 정확한 지 다시 한 번 확인해보시기 바랍니다.</p>
			<div class="more">
				<router-link :to="{ name: 'home' }" class="box-btn">
					<span>메인으로 돌아가기</span>
				</router-link>
			</div>
		</div>
	</div>
</template>
