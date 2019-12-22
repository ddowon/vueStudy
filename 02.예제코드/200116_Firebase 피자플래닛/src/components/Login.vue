<template>
	<div class="row">
		<div>
			<div>
				<p v-if="!currentUser">계속하려면 로그인 해 주세요.</p>
				<p v-else>로그인 중인 정보: <br> {{ currentUser }}</p>
			</div>
			<form>
				<template v-if="!currentUser">
					<div class="form-group">
						<label>Email: </label>
						<input type="email" class="form-control" id="email" placeholder="Enter email">
					</div>
					<div class="form-group">
						<label>Password: </label>
						<input type="password" class="form-control" id="password" placeholder="Enter password">
					</div>
					<button type="button" class="btn btn-primary" @click.prevent="signIn">로그인</button>
				</template>
				<template v-else>
					<button type="button" class="btn btn-danger" @click.prevent="signOut">로그아웃</button>
				</template>
			</form>
		</div>
	</div>
</template>

<script>
import * as firebase from 'firebase/app'

export default {
	computed: {
		currentUser() {
			return this.$store.getters.currentUser
		}
	},
	created() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.dispatch('setUser', user)
			} else {
				this.$store.dispatch('setUser', null)
			}
		})
	},
	methods: {
		signIn() {
			let email = document.getElementById('email').value
			let password = document.getElementById('password').value

			firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
				this.$router.push({ name: 'adminLink' })
			}).catch((error) => {
				let errorCode = error.code
				let errorMessage = error.message

				if (errorCode === 'auth/wrong-password') {
					alert(`잘못된 비밀번호입니다!`)
				} else {
					alert(errorMessage)
				}
			})
		},
		signOut() {
			firebase.auth().signOut().then(() => {
				alert(`성공적으로 로그아웃하였습니다!`)
			}).catch((error) => {
				alert(`에러가 발생했습니다. 도선생에게 문의하세요!`)
			})
		}
	}
}
</script>

<style>
form {
	margin: 20px 0;
}
</style>