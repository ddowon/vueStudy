<template>
	<div class="login-form">
		<section id="firebaseui-auth-container"></section>
	</div>
</template>

<script>
import * as firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
	props: [ 'pageTitle' ],
	created() {
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				this.initUI()
			}
		})
	},
	methods: {
		initUI() {
			const ui = (firebaseui.auth.AuthUI.getInstance()) ? firebaseui.auth.AuthUI.getInstance() : new firebaseui.auth.AuthUI(firebase.auth())
			const firebaseUIConfig = {
				// 로그인 성공했을 시 이동할 페이지
				signInSuccessUrl: '/vuex/boxoffice',
	
				// 사용할 로그인 방법(구글, 페이스북, 이메일)
				signInOptions: [
					firebase.auth.FacebookAuthProvider.PROVIDER_ID,
					firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					firebase.auth.EmailAuthProvider.PROVIDER_ID
				]
			}
			ui.start('#firebaseui-auth-container', firebaseUIConfig)
		}
	}
}
</script>

<style scoped>
.login {color:#fafafa;background-color:#212121}
.login >>> ul a {color:#ededed}
.el-divider {background-color:#373737}
</style>