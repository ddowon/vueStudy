<template>
	<div id="app">
		<AppNav/>
		<el-main>
			<!-- router-view에 src/router.js에서 작성한 path, component와 일치하는 컴포넌트가 보여집니다. -->
			<router-view/>
		</el-main>
		<AppFooter/>
	</div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
	components: {
		AppNav, AppFooter
	},
	data: () => ({

	}),
	mounted () {

	},
	watch: {

	}
}
</script>

<style>
/* RESET DEFAULT ELEMENTS STYLE */
body,section,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,textarea,p,blockquote,th,td,input,select,textarea,button {margin:0;padding:0}
dl,ul,ol,menu,li {list-style:none}
img,fieldset,iframe {border:0 none}
img {vertical-align:top}
input,select,textarea,button {vertical-align:middle}
a {text-decoration:none}
a:hover {text-decoration:underline}
a:active {background-color:transparent}
article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,main {display:block}
blockquote,q {quotes:none}
blockquote:before,blockquote:after,q:before,q:after {content:'';content:none}

html, body {width:100%;min-width:1340px;background:#f9f9f9}

.blind {display:block;overflow:hidden;visibility:hidden;text-indent:-9999px;font-size:0;height:0}
.ir {display:block;overflow:hidden;text-align:left;text-indent:-9999px;font-size:0 !important;background-repeat:no-repeat;background-position:0 0}
.loader {z-index:512;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000}

#app {
	background-color:#fff;
	max-width:1280px;
	margin:0 auto
}
</style>