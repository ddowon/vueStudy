<template>
	<div class="profile-userinfo">
		<template v-if="user">
			<img :src="user.photoURL" />
			<p>이름: {{ user.displayName }}</p>
			<p>이메일: {{ user.email }}</p>
			<p>uid: {{ user.uid }}</p>
			<p>로그인 방법: {{ user.providerData[0].providerId }}</p>

			<button class="btn_logout" @click="handleSignoutPressed">로그아웃</button>
		</template>
	</div>
</template>

<script>
import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
	props: [ 'pageTitle' ],
	data: () => ({
		user: null
	}),
	created() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.user = user
			} else {
				this.$router.push({ name: 'login' })
			}
		})
	},
	methods: {
		handleSignoutPressed() {
			firebase.auth().signOut().then(() => {
				setTimeout(() => {
					this.$router.push({ name: 'home' })
				}, 500)
			}).catch((err) => {
				console.log(`에러가 발생하여 로그아웃하지 못했습니다.`)
			})
		}
	}
}
</script>

<style lang="scss">
.btn_logout {
	display:block;
	float:left;
	height:35px;
	line-height:35px;
	margin-right:8px;
	padding:0 16px;
	color: #fff;
	border:0;outline:0;border-radius:5px;
	background-color: #f5365c;
	border-color: #f5365c;
	box-shadow:0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
	cursor:pointer;
}
</style>