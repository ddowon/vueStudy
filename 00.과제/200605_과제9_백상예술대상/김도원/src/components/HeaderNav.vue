<template>
	<div class="gnb">
		<ul>
			<li class="m1"><router-link to="/intro"><span>시상식 소개</span></router-link></li>
			<li class="m2"><router-link to="/candidate"><span>56회 후보자 · 작품</span></router-link></li>
			<li class="m3"><router-link to="/replay"><span>다시보기</span></router-link></li>
			<li class="m5"><router-link to="/winners"><span>역대 수상</span></router-link></li>
			<li class="m4"><router-link to="/vote"><span>투표하기</span></router-link></li>
			<li class="m7"><router-link to="/noticeList"><span>공지사항</span></router-link></li>
		</ul>
	</div><!-- .gnb -->
</template>

<script>
	export default {
		name: 'headerNav',
		props: {
			msg: String
		}
	}

</script>

