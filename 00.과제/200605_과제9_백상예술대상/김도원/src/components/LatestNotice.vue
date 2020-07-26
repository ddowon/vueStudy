<template>
	<div class="notice-wrap ani-visible">
		<div class="container-inner">
			<h2>제56회 백상예술대상 <strong>공지사항</strong></h2>
			<p class="desc">새로운 소식을 전해드립니다.</p>
			<div class="notice">
				<div class="head">
					<h3>공지사항</h3>
					<router-link :to="{ name: 'notice' }">
						<span>더보기</span>
					</router-link>
				</div><!-- .head -->

				<!-- 도원님이 가장 최근 공지사항 게시글 2개 출력 구현할 부분 -->
				<div class="list">
					<ul>
						<li>
							<a href="/noticeView/7">
								<strong>
									<i>제56회 백상예술대상 디지털 생중계 관련 안내 </i>
								</strong>
								<span>
									<i>
										‘제56회 백상예술대상’ 디지털 생중계 관련 안내 드립니다.
									</i>
								</span>
								<em>2020.06.05</em>
							</a>
						</li>
						<li>
							<a href="/noticeView/6">
								<strong>
									<i>제56회 백상예술대상 레드카펫 생중계 안내</i>
								</strong>
								<span>
									<i>
										제56회 백상예술대상 레드카펫 생중계 안내
									</i>
								</span>
								<em>2020.06.05</em>
							</a>
						</li>
					</ul>
				</div><!-- .list -->
			</div><!-- .notice -->
			<div class="share">
				<!-- 20200513 -->
				<a class="insta" href="https://www.instagram.com/baeksang.official/"
					target="_blank"><span>인스타그램</span></a>
				<!-- //20200513 -->
				<a class="facebook" href="https://www.facebook.com/BaeksangAwards/"
					target="_blank"><span>페이스북</span></a>
				<a class="youtube" href="https://www.youtube.com/channel/UCVXN28NHfphVQrdtjooc33g"
					target="_blank"><span>유튜브</span></a>
			</div><!-- .share -->
		</div><!-- .container-inner -->
	</div><!-- .notice-wrap -->
</template>

<script>
export default {
	name: 'latestNotice'
}
</script>
