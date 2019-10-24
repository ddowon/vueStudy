<template>
	<div>
		<ul>
			<li v-for="(monster, index) in $store.state.monsters" :key="index">
				<h2>{{ index + 1 }}번 몬스터 - {{ monster.name }}</h2>
				<p>{{monster.status.died ? '죽었다' : '안죽었다'}}</p>

				<!-- 자세히 보기 버튼 클릭 시 모달창 대신 http://localhost:8080/#/monster/view/몬스터 숫자(= 배열 인덱스)로 이동하도록 수정해 보세요. -->
				<!--
					[힌트] 2가지 방법이 있습니다.
					1. <router-link> 활용하기
					<router-link :to="{ name: router.js에서 정해준 라우트 이름, params: { id: 몬스터 숫자 }}">{{ monster.name }} 자세히 보기</router-link>
					2. 라우터 인스턴스 push 메소드 활용하기 (메소드는 template 안이 아니라 script 안에서 처리해야겠죠?)
					this.$router.push({ name: router.js에서 정해준 라우트 이름, params: { id: 몬스터 숫자 }})
				-->
				<router-link :to="{ name: 'monsterView', params: { id: index }}" >{{ monster.name }} 자세히 보기</router-link>
			</li>
		</ul>
	</div>
</template>
<script>

export default {


}
</script>

<style scoped>
	
</style>