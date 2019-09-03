<template>
	<div class="monster">
		<!-- 부모 컴포넌트인 src/App.vue에서 보낸 page-title="pageTitle" 값을 넣어줍니다.
			Vue의 보간법에는 케밥 케이스(aa-bb-cc)를 사용할 수 없습니다.
			이 부분은 다음 스터디 때 한 번 더 설명할게요.
			ex)
			부모 컴포넌트에서 보낸 page-title 속성을 자식 컴포넌트 template에 보간법으로 표기하려면?
				{{ pageTitle }}
			부모 컴포넌트에서 보낸 monster-item-list 속성을 자식 컴포넌트 template에 보간법으로 표기하려면? monsterItemList
				{{ monsterItemList }}
		-->
		<h1>{{pageTitle}}</h1>
		<el-divider></el-divider>
		
		<!-- 자식 컴포넌트인 src/components/MonsterList.vue를 표기합니다.
			script에 적어 준 mosters 데이터를 MonsterList 컴포넌트에 monsters 속성으로 전달합니다.

			자식 컴포넌트에서 '몬스터 추가하기' 버튼 클릭 시, 자식의 sendAddMonster 메소드를 부모 컴포넌트로 전달합니다.
			부모 컴포넌트에서는 자식에서 addMonster 이벤트가 발생하면 이를 감지,
			속성값에 바인딩한 최종 메소드 addRealMonster(실제 몬스터 데이터를 추가하는 액션이 담긴 메소드)를 호출합니다.
		-->

		<!--
			여기서는 한 단계 더 이해를 돕기 위해 자식에서 부모로 전달할 이벤트명을 add로 꼬아보았습니다.
			[자식] sendAddMonster() 실행 -> this.$emit('add')로 부모에 add 이벤트명 전달 -> [부모] @add 수신 -> addRealMonster() 실행

			****** 이벤트를 주고 받는 것이기 때문에 v-bind가 아닌 v-on 디렉티브임을 명심하세요.
			****** :add="addRealMonster" (X)
			****** @add="addRealMonster" (O)
		-->
		<MonsterList :monsters="monsters" @add="addRealMonster"/>
	</div>
</template>

<script>
import MonsterList from '@/components/MonsterList.vue'
export default {
	components: { 
		MonsterList 
	},
	// 부모 컴포넌트 src/App.vue에서 보낸 속성
	props: ['page-title'],

	// 자식 컴포넌트 src/components/MonsterList.vue에 monsters 속성으로 보낼 데이터
	data: () => ({
		monsters: [
			{
				name: '쿠키몬스터',
				age: 3,
				desc: '똑똑하고 지적이에요. 쿠키를 좋아해요.',
				hp: 100,
				fullHp: 100,
				state: {
					danger: false, 
					died: false 
				}
			},
			{
				name: '무릉이',
				age: 1,
				desc: '귀여워요. 새내기라 어리버리해서 많이 알려줘야 해요.',
				hp: 100,
				fullHp: 100,
				state: {
					danger: false, 
					died: false 
				}
			},
			{
				name: '또원이',
				age: 3000,
				desc: '천재이자 맥주 마스터예요. 실제 나이는 3000살이라는 소문이...',
				hp: 100,
				fullHp: 100,
				state: {
					danger: false, 
					died: false 
				}
			},
			{
				name: '망소',
				age: 17,
				desc: '옆집 사는 성훈이 바라기예요. 마음만은 열일곱이라는데...',
				hp: 100,
				fullHp: 100,
				state: {
					danger: false, 
					died: false 
				}
			},
			{
				name: '은서',
				age: 2,
				desc: '은서는 천사예요. 아빠보단 엄마를 좋아한다고..!',
				hp: 100,
				fullHp: 100,
				state: {
					danger: false, 
					died: false 
				}
			},
			{
				name: 'JJ',
				age: -100,
				desc: '뭔가 이상해요. 하는 꼴을 보면 아직 알에서 부화하지 않은 것 같아요. 실체가 없어요.',
				hp: 100,
				fullHp: 100,
				state: {
					danger: false, 
					died: false 
				}
			}
		]
	}),

	methods: {
		addRealMonster() {
			// console.log 대신 monsters에 몬스터를 추가해야겠죠?
			// 무엇을 어떻게 해야할까요?
			this.monsters.push({
				name: '새몬스터',
				age: -100,
				desc: '어떤 몬스터가 추가될까요?',
				hp: 100,
				fullHp: 100,
				state: {
					danger: false, 
					died: false 
				}
			})
			console.log('몬스터를 추가했습니다!')
		}
	}
}
</script>
