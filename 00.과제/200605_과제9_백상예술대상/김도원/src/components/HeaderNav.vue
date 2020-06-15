<template>
	<div class="gnb">
		<ul>
			<router-link tag="li" class="m1" :to="{ name: 'about' }" exact><a><span>시상식 소개</span></a></router-link>
			<router-link tag="li" class="m2" :to="{ name: 'candidate' }"><a><span>56회 후보자 · 작품</span></a></router-link>
			<router-link tag="li" class="m3" :to="{ name: 'replay' }" exact><a><span>다시보기</span></a></router-link>
			<router-link tag="li" class="m5" :to="{ name: 'winners' }" exact><a><span>역대 수상</span></a></router-link>
			<router-link tag="li" class="m4" :to="{ name: 'vote' }" exact><a><span>투표하기</span></a></router-link>
			<router-link tag="li" class="m7" :to="{ name: 'notice' }" exact><a><span>공지사항</span></a></router-link>
		</ul>
	</div><!-- .gnb -->
</template>

<script>
	export default {
		name: 'headerNav'
	}
</script>