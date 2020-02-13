<template>
<div id="topArea" class="clearFix">
	<div class="group">
		<h1><a href="#" data-attr="home"><img src="http://s.nx.com/s2/game/closers/2017/newTopBar/img_logo.png" alt="클로저스" id="gtmClickEvent_TopArea_Closers" class="gtmClickEventButton" /></a></h1>
		<p class="btnStart"><a href="#" id="gtmClickEvent_TopArea_GameStart" class="gtmClickGameStart" data-attr="gamestart">게임 스타트</a></p>
		<div class="etcArea">
			<ul class="snsArea clearFix">
				<li><a href="#" id="gtmClickEvent_TopArea_Home" class="home gtmClickEventButton" data-attr="home">홈으로 이동하기</a></li>
				<li><a href="#" id="gtmClickEvent_TopArea_Sns_Tw" class="tw gtmClickEventButton" data-attr="tw">트위터로 공유하기</a></li>
				<li><a href="#" id="gtmClickEvent_TopArea_Sns_Fb" class="fb gtmClickEventButton" data-attr="fb">페이스북으로 공유하기</a></li>
			</ul>
		</div>
		<div class="slideArea">
			<div class="mask">
				<ul v-if="bannerList.length" class="evLink clearFix">
					<li v-for="(item, idx) in bannerList" :key="idx" :class="{ 'on': windowLocationHref.indexOf(item.link.split('?')[0]) > -1 }">
						<a :href="item.link" :class="`m${idx}`" :data-idx="idx"><img :src="item.bg" :id="`gtmClickEvent_TopArea_Navi_${idx}`" class="gtmClickEventBanner"></a>
					</li>
				</ul>
				<p class="evCalendar">
					<a href="/news/events/EventCalendar.aspx" id="gtmClickEvent_TopArea_EventCalendar" class="fb gtmClickEventButton">이벤트 캘린더 바로가기</a>
				</p>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: 'sideBanner',
	data: () => ({
		bannerList: [],
		windowLocationHref: window.location.href
	}),
	computed: {
		isNaver() {
			return this.windowLocationHref.match('naver') ? true : false
		},
		gnbHeight() {
			return this.isNaver ? 60 : 63
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (typeof topBar.json !== 'undefined' && topBar.json !== '') {
				this.bannerList = JSON.parse(topBar.json)
				this.followSideBanner()
			}
		})
	},
	methods: {
		followSideBanner() {
			window.addEventListener('scroll', () => {
				let scrollTop = window.scrollY || document.documentElement.scrollTop
				let topArea = document.getElementById('topArea')
				let topAreaGroup = topArea.querySelector('.group')
				let pageH = parseInt(document.getElementById('wrap').offsetHeight, 10)
				let evLinkH = parseInt(topAreaGroup.offsetHeight, 10)

				if (scrollTop > this.gnbHeight + 0 && scrollTop < pageH - evLinkH) {
					topAreaGroup.style.top = (scrollTop - this.gnbHeight) + 'px'
				} else if (scrollTop >= pageH - evLinkH) {
					topAreaGroup.style.top = (pageH - evLinkH - this.gnbHeight) + 'px'
				} else {
					topAreaGroup.style.top = 0 + 'px'
				}
			})
		}
	}
}
</script>
