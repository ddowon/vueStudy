<template>
<Fragment>
	<transition name="fade">
		<div v-if="!isPageLoaded" class="loader"></div>
	</transition>

	<header id="header">
		<div class="eventNav">
			<ul>
				<li v-for="(tab, idx) in tabs" :key="tab" :class="`event_${idx + 1}`"><a :href="`#tab${idx + 1}`" :class="{ active: currentTabIdx === idx }" @click.prevent="scrollToTab(idx)">{{ tab }}</a></li>
			</ul>
		</div>
	</header>

	<div id="contents" :style="`width:${contentsWidth}`">
		<section id="visual" class="section">
			<div class="inner">
				<h1 class="blind"><em>마침내 ‘진짜 갓겜’으로!</em> - 클로저스 서버/클라이언트 64비트 업데이트</h1>
				<div id="cont_nav">
					<ul class="cont_nav">
						<li v-for="(tab, idx) in tabs" :key="tab" :class="[`cnv${idx + 1}`, { active: currentTabIdx === idx }]"><a :href="`#tab${idx + 1}`" @click.prevent="setCurrentTab(idx)"><span class="ir">{{ tab }}</span></a></li>
					</ul>
				</div>
			</div>
		</section>
		<div id="tabs">
			<section ref="tab1" id="tab1" class="tab_cont" :class="{ active: currentTabIdx === 0 }">
				<div class="inner">
					<div class="blind">
						<em>쾌적한 환경에서 마음껏 던전 플레이하고 초레어템도 얻어가세요!</em>
						<h2>캡슐 뽑기 이벤트</h2>
						<dl>
							<dt><strong>진행 기간: </strong></dt>
							<dd>20.04.09(목) 점검 후 ~ 20.05.07(목) 점검 전</dd>
							<dt><strong>빈 캡슐</strong></dt>
							<dd><strong>뽑기 기계의 아이템을 리필하는 데 필요한 재료 아이템</strong></dd>
							<dd>던전 클리어 시 2개를 획득하며, 뽑기 기계 리필을 위해서는 16개의 빈 캡슐이 필요합니다. (* 리필 진행 시 아이템 목록 전체가 초기화 됩니다.)</dd>
							<dt><strong>뽑기 코인</strong></dt>
							<dd><strong>리필된 보상을 뽑는 데 필요한 재료 아이템</strong></dd>
							<dd>코인 1개로 기계에 등장한 아이템 중 1개를 랜덤하게 획득합니다. (뽑기 확률은 모든 아이템이 동일)</dd>
							<dd>[뽑기 코인]은 공헌도 상점 또는 각 마을의 제작기를 통해 각종 재료를 사용해서 획득할 수 있어요!</dd>
						</dl>
						<h3>뽑기로 획득 가능한 주요 아이템</h3>
						<p>S 확정 D 컴포넌트(장비/코스튬), 달콤하게 속삭이는 서피드 위광, 폭식의 왕 벨제부브 위광, 파리대왕의 상향익 위광, 드래고니안 레어 액세서리, 스포티 클로저 코스튬 [A타입], 코스 원샷 +13, 형상 기억 매체, 알파 이퀄라이저, 강화기 백신, 샤이닝 싱크로 섬유, 64비트 코인</p>
						<h3>꾸준히 리필만 해도 쉽게 획득 가능한 [64비트 코인]으로 꿀템을 확정 제작하세요!</h3>
						<h3>캡슐 뽑기 기계는 플레인게이트 워프 게이트를 넘어간 후 맵 우측으로 가면 만날 수 있어요!</h3>
					</div>
					<h4 class="blind">유의사항</h4>
					<Note id="note1" :item="notes[0]" v-if="notes[0]" />
				</div>
			</section>
			<section ref="tab2" id="tab2" class="tab_cont" :class="{ active: currentTabIdx === 1 }">
				<div class="inner">
					<div class="blind">
						<em>오래 접속해도 걱정 없이 클로저스를 즐기고 초레어템도 얻어가세요!</em>
						<h2>누적 접속 핫타임 이벤트</h2>
						<dl>
							<dt><strong>진행 기간: </strong></dt>
							<dd>20.04.09(목) 점검 후 ~ 20.04.20(월) 오전 4시</dd>
						</dl>
						<h3>8 x 8 = 64! 총 8일 동안 접속만 해도 특별한 아이템을 드립니다!</h3>
						<p><strong>이번 주와 다음 주의 목/금/토/일요일에는 접속 필수!</strong></p>
						<h4>핫타임 보상 아이템 목록</h4>
						<dl>
							<dt><strong>접속 시: </strong></dt>
							<dd>64비트 재료 선택 상자</dd>
							<dt><strong>50분: </strong></dt>
							<dd>64비트 프리패스 모음 박스</dd>
							<dt><strong>100분: </strong></dt>
							<dd>마이룸 소형 통돌이</dd>
							<dt><strong>150분: </strong></dt>
							<dd>64비트 기념 데이터 조각</dd>
						</dl>
						<h3>접속해서 획득한 [64비트 기념 데이터 조각]으로 꿀템을 확정 제작하세요!</h3>
						<h4>64비트 기념 데이터 조각으로 제작 가능한 아이템</h4>
						<p>자세한 내용은 이벤트 페이지 이미지를 참고해 주세요.</p>
					</div>
					<button class="btn_show64itemBox" @click="showModal('pop_64itemBox')"><span class="ir">64비트 재료 선택 상자 자세히 보기</span></button>
					<button class="btn_show64freepassBox" @click="showModal('pop_64freepassBox')"><span class="ir">64비트 프리패스 모음 박스 자세히 보기</span></button>
					<h4 class="blind">유의사항</h4>
					<Note id="note2" :item="notes[1]" v-if="notes[1]" />
				</div>
			</section>
			<section ref="tab3" id="tab3" class="tab_cont" :class="{ active: currentTabIdx === 2 }">
				<div class="inner">
					<div class="blind">
						<em>혹시나 하는 마음에 꺼렸던 컨텐츠도 이제는 걱정 없이 즐기세요!</em>
						<h2>64비트 업데이트와 함께 더욱 쾌적해진 게임 환경!</h2>
						<ul>
							<li>끊김 없는 파티 플레이 & 레이드</li>
							<li>간지 폭발 움직이는 비주얼 프레임</li>
							<li>샤이닝 스타를 맞춘 이유 마을에서 밴드 공연</li>
						</ul>
						<h3>64비트 상세 안내</h3>
						<p>64비트 버전 클로저스는 <strong>별도의 재설치가 필요하지 않습니다.</strong><br>일반 점검 때와 동일하게 게임 실행 시 자동으로 64비트 업데이트가 진행됩니다.</p>
						<p>단 <strong>‘재배포 패키지 64비트 버전’</strong>과 <strong>‘최신 그래픽 드라이버’</strong>를 PC에 미리 설치해두어야만 정상적으로 64비트 업데이트가 가능합니다.</p>
						<p>아직 설치하지 않은 클로저님께서는 아래 경로를 통해 설치 후 게임 이용을 부탁 드립니다.</p>
						<p><strong>64비트 업데이트 이후, 32비트의 운영체제에서는 클로저스 플레이가 불가합니다. 양해 부탁 드립니다.</strong></p>
					</div>
					<a href="https://www.microsoft.com/ko-kr/download/details.aspx?id=13523" class="btn_goVisualCPackageDownload" target="_blank"><span class="ir">Microsoft Visual C++ 2010 SP1 재배포 가능 패키지(x64) 다운로드 바로 가기</span></a>
					<a href="/pds/download/download.aspx" class="btn_goGPUdriverDownload" target="_blank"><span class="ir">최신 버전 그래픽 드라이버 다운로드 바로 가기</span></a>
				</div>
			</section>
		</div>
	</div>

	<Modal v-for="modal in modals" :key="modal.id" :id="modal.id">
		<template v-slot:body>
			<h5 class="blind">{{ modal.title }}</h5>
		</template>
		<template v-slot:footer></template>
	</Modal>

	<!-- 모달창 모음 시작 -->
	<!-- <Modal id="pop_64itemBox">
		<template v-slot:body>
			<p class="text">{{ msg }}</p>
		</template>
		<template v-slot:footer>
			<button type="button" class="btnMessageBoxClose" @click="closeModal('pop_64itemBox')">확인</button>
		</template>
	</Modal>

	<Modal id="pop_64freepassBox">
		<template v-slot:body>
			<p class="text">{{ msg }}</p>
		</template>
		<template v-slot:footer>
			<button type="button" class="btnMessageBoxClose" @click="closeModal('pop_dialog')">확인</button>
		</template>
	</Modal>


	<Modal id="pop_dialog">
		<template v-slot:body>
			<p class="text">{{ msg }}</p>
		</template>
		<template v-slot:footer>
			<button type="button" class="btnMessageBoxClose" @click="closeModal('pop_dialog')">확인</button>
		</template>
	</Modal> -->
	<!-- 모달창 모음 끝 -->

	<transition name="modal-fade">
		<div v-if="modal.order.length" class="modal-bg"></div>
	</transition>
</Fragment>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

import { Fragment } from 'vue-fragment'
import { mapState, mapActions, mapGetters } from 'vuex'
import Note from '@/components/common/Note.vue'
import Modal from '@/components/common/Modal.vue'
import initMixin from '@/mixins/init.mixin'

export default {
	name: 'contents',
	components: { Fragment, Note, Modal },
	mixins: [ initMixin ],
	data: () => ({
		isPageLoaded: false,
		tabs: ['캡슐 뽑기 이벤트', '누적 접속 이벤트', '64비트 상세 안내'],
		currentTabIdx: 0,
		modals: [
			{ id: 'pop_64itemBox', title: '64비트 재료 선택 상자 자세히 보기' },
			{ id: 'pop_64freepassBox', title: '64비트 프리패스 모음 박스 자세히 보기' }
		],
		notes: []
	}),
	computed: {
		...mapState('ui', [
			'isScrolled', 'modal'
		])
	},
	created() {
		this.fetchEventAttentions()
		window.addEventListener('scroll', this.updateTab)
	},
	mounted() {
		setTimeout(() => {
			this.isPageLoaded = true
		}, 1000)
		this.$nextTick(() => {
			this.updateTab()
		})
	},
	destroyed() {
		window.removeEventListener('scroll', this.updateTab)
	},
	methods: {
		...mapActions('ui', [
			'showModal', 'closeModal', 'enableScroll', 'disableScroll'
		]),
		fetchEventAttentions() {
			let cleanString = decodeURIComponent(arrAttention).replace(/\n/gi, '')
			this.notes = JSON.parse(cleanString).filter(note => note !== '-')
		},
		setCurrentTab(idx) {
			this.currentTabIdx = idx
		},
		scrollToTab(idx) {
			let target = `#tab${idx + 1}`
			this.disableScroll()
			this.setCurrentTab(idx)
			gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: -100, autoKill: true }, ease: 'power3.out',
				onComplete: () => this.enableScroll()
			})
		},
		updateTab() {
			if (!gsap.isTweening(window) && !this.isScrolled) {
				let scrollPos = window.scrollY - 100,
					docHeight = parseInt(document.documentElement.scrollHeight || document.body.scrollHeight)

				this.tabs.forEach((tab, idx) => {
					let target = this.$refs[`tab${idx + 1}`]

					if (scrollPos + this.winHeight >= docHeight) {
						this.setCurrentTab(this.tabs.length - 1)
					} else {
						if (target.offsetTop <= scrollPos && target.offsetTop + target.clientHeight > scrollPos) {
							this.setCurrentTab(idx)
						}
					}
				})
			}
		}
	}
}
</script>