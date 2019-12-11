<template>
	<div class="login">
		<h1>{{ pageTitle }}</h1>
		<div id="firebaseui-auth-container">
			<template v-if="user">
				<img :src="user.photoURL" />
				<p>이름: {{ user.displayName }}</p>
				<p>이메일: {{ user.email }}</p>
				<p>uid: {{ user.uid }}</p>
				<p>로그인 방법: {{ user.providerData[0].providerId }}</p>
				<div class="btn_logout">
					<button type="button" @click="handleSignoutPressed">로그아웃</button>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
	props: ['pageTitle'],
	data: () => ({
		user: null
	}),
	created() {
		console.log('로그인??')
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.user = user
			} else {
				this.initFireBaseUI()
			}
		})
	},
	methods: {
		initFireBaseUI() {
			const uiConfig = {
				signInSuccessUrl: '/',
				signInOptions: [
					firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					firebase.auth.EmailAuthProvider.PROVIDER_ID,
					firebase.auth.FacebookAuthProvider.PROVIDER_ID
				]
			}
			const ui = (firebaseui.auth.AuthUI.getInstance()) ? firebaseui.auth.AuthUI.getInstance() : new firebaseui.auth.AuthUI(firebase.auth())
			ui.start('#firebaseui-auth-container', uiConfig)
		},
		handleSignoutPressed() {
			firebase.auth().signOut().then(() => {
				this.$router.push({name: 'home'})

			}).catch((err) => {
				this.$router.push({name: 'login'})
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
