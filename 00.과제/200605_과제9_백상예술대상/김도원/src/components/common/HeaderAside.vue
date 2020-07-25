<template>			
	<div class="account">
		<ul>
			<template v-if="isLogged">
				<li class="mypage"><a href="#">내 정보 {{ currentUser.name }}</a></li>
				<li class="signOut"><a href="#" @click.prevent="signOut">로그아웃</a></li>
			</template>
			<template v-else>
				<li class="signUp"><a href="#" @click.prevent="setSignUp">회원가입</a></li>
				<li class="signIn"><a href="#" @click.prevent="setSignIn">로그인</a></li>
			</template>
		</ul>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'headerAside',
	computed: {
		...mapGetters(
			'auth', [ 'currentUser', 'isLogged' ]
		)
	},
	methods: {
		...mapActions(
			'ui', [ 'setSignUp', 'setSignIn' ]
		),
		...mapActions(
			'auth', [ 'signOut' ]
		)
	}
}
</script>
