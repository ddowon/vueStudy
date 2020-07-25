<template>
	<div class="dim-wrap" v-show="openSignIn" @click.self="setSignIn(false)">
		<div class="dim-con sign-form-wrap">
			<form class="sign-form">
				<h3 class="form-title"><span>로그인</span>
				<button type="button" @click.prevent="setSignIn(false)">×</button></h3>
				<div class="form-group">
					<div class="callout -info">
						<h4>지금 가입하시면 혜택을 드려요!</h4>
						<ul>
							<li>노란 과자 라면 스낵 무제한 제공</li>
							<li>예감 과자 무제한 제공</li>
							<li>종류별 키보드 타건 체험 제공</li>
						</ul>
					</div>
				</div>
				<div class="form-group">
					<label for="email" class="label">Email</label>
					<input type="email" v-model="email" placeholder="Email" autocomplete="email" autofocus="autofocus" class="input">
				</div>
				<div class="form-group -inline">
					<label for="password" class="label">Password</label>
					<input type="password" v-model="password" placeholder="Password" class="input">
				</div>
				<div class="form-error text-center">
			
				</div>
				<div class="form-actions">
					<button type="submit" class="button primary -full" @click.prevent="signIn">로그인하기</button>
				</div>
				<div class="form-footer">
					<div class="control-group">
						<button type="button" class="button link" @click.prevent="openSignUpModal">계정을 새로 만들고 싶어요!</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	props: {
	},
	data: () => ({
		email: null,
		password: null,
		isLogged: false
	}),
	computed: {
		...mapGetters(
			'ui', [ 'openSignIn' ]
		)
	},
	mounted() {
	},
	methods: {
		...mapActions(
			'ui', [ 'setSignIn', 'setSignUp' ]
		),
		openSignUpModal() {
			this.setSignIn(false)
			this.setSignUp()
		},
		signIn() {
			this.$store.dispatch('auth/signIn', { email: this.email, password: this.password })
		}
	}
}
</script>
<style>
	/* 회원가입, 로그인 모달창 */
	.sign-form-wrap {overflow:hidden;width:480px;height:540px;margin:-270px 0 0 -240px;box-sizing:border-box;border-radius:15px}
	.sign-form {position:relative;overflow:hidden;width:480px;height:auto;margin:0 auto;text-align:left;background-color:#fff;box-shadow:0 20px 60px -2px rgba(27, 33, 58, 0.4);padding:0;box-sizing:border-box;border-radius:15px}
	.sign-form > div {padding:0 5%}
	.sign-form .label {border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;box-sizing:border-box}
	.sign-form .input {width:100%;height:54px;line-height:54px;margin:5px 0;padding:0 27px;font-size:16px;font-weight:400;border:2px solid #bbb;border-radius:30px;box-sizing:border-box;outline:0;transition:all ease 400ms}
	.sign-form .input:focus {border-color:#f77b24}
	.sign-form .form-title {display:flex;justify-content:space-between;align-items:center;background-color:#0a2b4e;color:#fff;margin-bottom:20px;padding:16px 5%;font-size:24px;font-weight:400}
	.sign-form .form-title button {margin:0;padding:0;border:none;background:none;color:#fff;font-size:35px;cursor:pointer}
	.sign-form .form-group {display:flex;flex-direction:column;margin:2px 0}
	.sign-form .button {display:inline-flex;height:54px;margin:.5em 0;padding:0 30px;color:#fff;text-decoration:none;align-items:center;justify-content:center;line-height:54px;border:none;border-radius:30px;cursor:pointer;transition:all .55s cubic-bezier(.19,1,.22,1);overflow:hidden;position:relative;-webkit-tap-highlight-color:transparent;box-sizing:border-box;outline:0}
	.sign-form .button[disabled] {opacity:0.7;pointer-events:none}
	.sign-form .button.primary {font-size:20px;font-weight:600;letter-spacing:-1px;background:linear-gradient(to top right,#41b782,#86d169)}
	.sign-form .button.link {background:0 0;border:none;padding:0;color:#0a2b4e}
	.sign-form .button.-full {white-space:nowrap;width:100%}
	.sign-form .callout.-info {margin-bottom:13px;padding:13px 20px 0 18px;background-color:#f2f9fa;border:1px solid #a8d7dd;color:#214e54;border-radius:10px}
	.sign-form .callout.-info h4 {font-size:18px}
	.sign-form .callout.-info ul {margin:0 0 0 20px;padding:8px 20px;list-style-type:disc}
	.sign-form .callout.-info ul li {margin-bottom:5px;list-style-type:disc}
	.sign-form .form-footer {margin-top:10px;background-color:#ececec}
	.sign-form .form-footer .control-group {display:flex;align-items:center;flex-direction:row;flex-wrap:wrap}
</style>