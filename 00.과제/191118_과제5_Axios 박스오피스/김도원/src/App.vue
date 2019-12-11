<template>
	<div id="app">
		<AppNav/>
		<el-main>
			<router-view :page-title="pageTitle"/>
		</el-main>
	</div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'

export default {
	components: {
		AppNav
	},
	data: () => ({
		docTitle: 'UI 파트 스터디',
		pageTitle: null
	}),
	mounted () {
		document.title = (this.$route.meta.title) ? `${this.$route.meta.title} :: ${this.docTitle}` : this.docTitle
		this.pageTitle = (this.$route.meta.title) ? this.$route.meta.title : this.docTitle
	},
	watch: {
		$route(to, from) {
			document.title = (to.meta.title) ? `${to.meta.title} :: ${this.docTitle}` : this.docTitle
			this.pageTitle = (to.meta.title) ? to.meta.title : this.docTitle
		}
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

html, body {width:100%;min-width:1024px;background:#212121}

.blind {display:block;overflow:hidden;visibility:hidden;text-indent:-9999px;font-size:0;height:0}
.ir {display:block;overflow:hidden;text-align:left;text-indent:-9999px;font-size:0 !important;background-repeat:no-repeat;background-position:0 0}
.loader {z-index:512;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000}
.el-main, .el-menu {max-width:1280px;margin:0 auto;padding:0;color:#fafafa}
.el-main > div, .el-main > section {padding:40px 20px}
.el-menu.el-menu--horizontal {border:none}
.el-divider {background-color:#373737}
</style>
