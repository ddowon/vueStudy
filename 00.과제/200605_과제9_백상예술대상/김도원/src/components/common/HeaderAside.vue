<template>			
	<div class="account">
		<ul>
			<template v-if="isLogged">
				<li class="mypage"><a href="#">내 정보 {{ currentUser.name }}</a></li>
				<li class="signOut"><a href="#" @click.prevent="signOut">로그아웃</a></li>
			</template>
			<template v-else>
				<li class="signUp"><a href="#" @click.prevent="openSignUp">회원가입</a></li>
				<li class="signIn"><a href="#" @click.prevent="openSignIn">로그인</a></li>
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
				'user', [ 'currentUser', 'isLogged' ]
			)
		},
		methods: {
			...mapActions(
				'ui', [ 'openSignUp', 'openSignIn' ]
			),
			...mapActions(
				'user', [ 'signOut' ]
			)
		}
	}
</script>
