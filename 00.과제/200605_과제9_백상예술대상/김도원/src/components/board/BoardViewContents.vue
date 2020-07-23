<template>
	<div class="view_cont">
		<template>
			<div class="view_cont_txt" v-html="item.contents">
			</div>
			<!-- 보시면 files가 
			한 게시글에 첨부파일이 2개일 수도 있잖아요? 지금 저희는 구현을 글쓰기에 1개만 넣어놨지만요.
			db상에는 첨부파일이 여러개일수도 있으니.. files[] array로 되어 있어요.
			그래서 v-if에 item.files.length 처리를 한 후에, 첨부파일이 있으면 img를 v-for로 돌려돌려 아시쥬? 그리고 alt값에는 item.title 넣어주시고 고고고고고고ㅗ고곡고 -->
			<div v-if="item.files.length" class="view_cont_img">
				<img :src="img.url" :alt="item.title" v-for="img in item.files" :key="img.path">
			</div>
			<div class="bv_footer">
				<template>
					<div class="button button_center">
						<a href="#" class="box-btn btn-like" @click="like(item.id)"><span>추천<span>{{item.cnt.like}}</span></span></a>
						<a href="#" class="box-btn btn-dislike" @click="dislike(item.id)"><span>비추천<span>{{Number(item.cnt.dislike)}}</span></span></a>
					</div>
				</template>
				<template>
					<div class="button button_right">
						<a class="box-btn" @click.prevent="updateItem(item.id)"><span>수정</span></a>
						<a class="box-btn" @click.prevent="removeItem(item.id)"><span>삭제</span></a>
					</div>
				</template>
			</div>
		</template>
	</div>
</template>

<script>
const API_URI = (window.location.protocol === 'https:') ? process.env.VUE_APP_HTTPS_API_URI : process.env.VUE_APP_API_URI
import { mapGetters } from 'vuex'
export default {
	props: [ 'item' ],
	components: {
	},
	data: () => ({
	}),
	computed: {
		...mapGetters('user', [ 'isLogged', 'currentToken' ])
	},
	watch: {
	},
	created() {
		},
	mounted() {
		console.table(this. item)
		console.log(typeof this.item.cnt.like)

	},
	methods: {
		like(id) {
			let headers = {
				'x-access-token': 'guest'
			}
			console.table(this.item)
			if (this.isLogged) {
				headers['x-access-token'] = this.currentToken
			}
			this.axios.put(`${API_URI}/notice/like/${id}`, null, {
				headers: headers
			})
			.then((res) => {
				this.item.cnt.like = this.item.cnt.like + 1
				// this.$emit('forceKeyUpdate')
			}).catch((err) => {
				alert(err.response.data.message)
			})
		},
		dislike(id) {
			let headers = {
				'x-access-token': 'guest'
			}

			if (this.isLogged) {
				headers['x-access-token'] = this.currentToken
			}
			this.axios.put(`${API_URI}/notice/dislike/${id}`, null, {
				headers: headers
			})
			.then((res) => {
				this.item.cnt.dislike = this.item.cnt.dislike + 1

				// this.$emit('forceKeyUpdate')
			}).catch((err) => {
				alert(err.response.data.message)
			})
		}
	}
}
</script>