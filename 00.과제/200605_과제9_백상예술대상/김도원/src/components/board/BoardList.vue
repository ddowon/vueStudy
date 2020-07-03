<template>
	<table v-if="info">
		<caption>{{info.title}} 게시판 : 번호, 제목, 작성일</caption>
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
				<td>{{item.id}}</td>
				<td class="title">
					<a :href="`/noticeView/${item.id}?pageNo=1&amp;pageSize=5`">{{item.title}}</a>
				</td>
				<td>{{writeDate(item.updated_at)}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

export default {
	props: ['info'],
	components: {
	},
	data: () => ({
	
	}),
	watch: {
		
	},

	created() {
	},

	methods: {
		writeDate(time) {
			let writeTime = this.$moment(time)
			let today = this.$moment()
			let diff = today.diff(writeTime, 'days')

			if (diff < 3) { 
				return `${diff}일 전`
			} else { 
				return this.$moment(time).format('YYYY-MM-DD')
			}
		}
	}
}
</script>