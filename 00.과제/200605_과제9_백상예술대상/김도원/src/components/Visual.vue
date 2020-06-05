<template>
<Fragment>
	<div class="visual-wrap ani-visible">
		<div class="container-inner">
			<div class="visual">
				<div>
					<img src="http://images.jtbc.joins.com/baeksang/2020/visual_baeksang2020.png" alt="제56회 백상예술대상 Baeksang Arts Award">
				</div>
			</div><!-- .visual -->
		</div><!-- .container-inner -->
	</div><!-- .visual-wrap -->
	<div class="info-wrap ani-visible">
		<div class="container-inner">
			<p>최고 권위의 종합예술상 백상예술대상</p>
			<h2>
				<strong>2020년 6월 5일 (금) 오후 4시 50분</strong><!-- 20200514 -->
				<span>일산 KINTEX</span>
			</h2>
			<a class="box-btn" href="/intro"><span>자세히 보기</span></a>
		</div><!-- .container-inner -->
	</div><!-- .info-wrap -->
</Fragment>
	
</template>

<script>
	import { Fragment } from 'vue-fragment'
	export default {
		name: 'visual',
		components: {
			Fragment
		},
		props: {
			msg: String
		}
	}

</script>
