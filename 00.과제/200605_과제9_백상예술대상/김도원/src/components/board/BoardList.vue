<template>
	<table v-if="info">
		<caption>{{ info.title }} 게시판 : 번호, 제목, 작성일</caption>
		<colgroup>
			<col style="width:18%;">
			<col style="">
			<col style="width:18%;">
		</colgroup>
		<thead>
			<tr>
				<th scope="col">번호</th>
				<th scope="col">제목</th>
				<th scope="col">작성일</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in info.list" :key="item.id">
				<td>{{ item.id }}</td>
				<td class="title">
					<router-link :to="{ name: `${info.routerName}_view`, params: { 'id': item.id } }">
						{{ item.title }}
					</router-link>
				</td>
				<!--
					updated_at은 최종 수정일을 뜻하므로, 작성일인 created_at을 표기
					method명 빼고는 수정사항 없음! ^0^
				-->
				<td>{{ formatDate(item.created_at) }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	props: [ 'info' ],
	methods: {
		formatDate(time) {
			let today = this.$moment()
			let created_at = this.$moment(time)
			let diff = today.diff(created_at, 'days')

			if (diff < 3) { 
				return `${diff}일 전`
			}

			// 요즘 else 지우기 운동을 하는 중
			// true/false 분기에 의해 데이터를 반환해야 한다면 만족하는 조건을 먼저 작성하고 나중에 올 else를 제거하거나 삼항 연산자를 활용
			return this.$moment(time).format('YYYY-MM-DD')
		}
	}
}
</script>