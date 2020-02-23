<template>
	<div class="note" v-html="item">
		{{ item }}
	</div>
</template>

<script>
export default {
	name: 'note',
	props: {
		item: { type: String, required: true }
	}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&display=swap&subset=korean');
.note {position:absolute;left:50%;width:1280px;margin-left:-640px;text-align:center;font-size:15px;font-weight:400;font-family:'Noto Sans KR', 'Malgun Gothic', 'NanumSquare', 'Nanum Gothic', sans-serif;letter-spacing:-0.5px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;text-shadow:rgba(0,0,0,.15) 0 0 1.5px}
.note >>> ul {width:1180px;margin:0 auto}
.note >>> ul > li {position:relative}
.note >>> ul > li:before {content:'';display:inline-block;width:18px;height:18px;margin:0 5px 0 0;vertical-align:-4px}
.note li {margin-bottom:5px}
.note li:last-child {margin-bottom:0}
.note li, .note p {color:#333}
.note li, .note p, .note a {line-height:1.3}
.note a {color:inherit}
.note strong {color:#ff0000;font-weight:400}
.note span {vertical-align:1px}
.note li, .note p, .note a, .note strong, .note span {font-size:15px !important}
</style>