<template>
<div id="wrap">
	<div v-if="!isPageLoaded" class="loader"></div>
	<SideBanner />
	<div id="contents" :style="contentsWidth">
		<div id="sec1" class="section">
			<h1 class="blind"><em>서피드 펫 & 파이 펫 출시</em> - 펫 시스템 RENEWAL</h1>
			<div class="inner">
				<div class="ani a1"></div><div class="ani a2"></div><div class="ani c1"></div><div class="ani c2"></div>
				<div class="ytb_wrap">
					<div class="btn_play" v-show="!isVideoPlaying"><a href="#" @click.prevent="playVideo"><span class="ir">펫 시스템 RENEWAL 영상 재생하기</span></a></div>
					<div class="ytb" :class="{ 'active': isVideoPlaying }">
						<iframe v-if="isVideoPlaying" width="943" height="530" :src="`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=0&showinfo=0&autoplay=1&mute=0`" frameborder="0" allowfullscreen="" allow="autoplay;encrypted-media"></iframe>
					</div>
				</div>
				<div class="btn_popup btn_showSlider1">
					<a href="#pop_imgSlider" @click.prevent="showModal('pop_selectCharacter')"><span class="ir">영운-별빛 속삭임(30일) 자세히 보기</span></a>
				</div>
				<div class="btn_popup btn_showSlider2">
					<a href="#pop_imgSlider" @click.prevent="showModal('pop_confirm')"><span class="ir">종이학 자세히 보기</span></a>
				</div>
				<div class="btn_popup btn_showSlider3">
					<a href="#pop_imgSlider" @click.prevent="showModal('pop_imgSlider')"><span class="ir">종이학 자세히 보기</span></a>
				</div>

				<Note id="note1" :item="notes[0]" v-if="notes[0]" />
			</div>
		</div>
		<div id="sec2" class="section">
			<div class="inner">
				<h2 class="blind">펫 편의성 업데이트</h2>
				<p class="blind">내가 원하는 펫으로 외형 설정이 가능한 펫 스킨 시스템 추가 및 펫 계정 공유, 펫 아이템 자동 사용 기능의 추가!</p>
				<h2 class="blind">펫 강화 시스템 추가</h2>
				<p class="blind">펫을 강화하면 한 단계 추가 스펙 UP!</p>
				<p class="blind">강화된 펫은 종합 전투력에 반영돼요!</p>
				<div class="btn_showItemMore">
					<a href="#" @click.prevent=""><span class="ir">자동 사용 가능 아이템 자세히 보기</span></a>
					<span class="tooltip"></span>
				</div>
				<Note id="note2" :item="notes[1]" v-if="notes[1]" />
			</div>
		</div>
		<div id="sec3" class="section">
			<div class="inner">
				<h2 class="blind">펫 전송기 출시</h2>
				<p class="blind">원하는 펫을 획득할 새로운 방법, 20년 1차 펫 전송기 [서피드 픽업] 출시!</p>
				<div class="btn_goPetNotice">
					<a href="/board/16777344/2617/" target="_blank"><span class="ir">펫 전송기 자세히 보기</span></a>
				</div>
				<h2 class="blind">펫 시스템 리뉴얼 기념 이벤트</h2>
				<p class="blind">이벤트 던전 [발렌타인 페스티벌] 클리어하면 전설의 레전드 펫 랜덤 상자, 펫 코어 제작 가능!</p>
				<div class="btn_goEvent">
					<a href="/board/16777344/2618/" target="_blank"><span class="ir">이벤트 자세히 보기</span></a>
				</div>
			</div>
		</div>
	</div>
	<Modal id="pop_selectCharacter">
		<template v-slot:body>
			<select class="select1">
				<option>교환 수량 선택</option>
			</select>
			<select class="select3">
				<option>캐릭터 선택</option>
			</select>
			<p class="blind">으로 보상 아이템을 받으시겠습니까?</p>
		</template>
		<template v-slot:footer>
			<button type="button" class="modal-btn-ok" @click="closeModal('pop_selectCharacter')">확인</button>
			<button type="button" class="modal-btn-ok ok2" @click="showModal('pop_confirm')">열어라</button>
		</template>
	</Modal>
	<Modal id="pop_confirm">
		<template v-slot:body>
			<h2 class="blind">게임 내 우편으로 아이템 지급이 완료됐습니다. 우편[서찰]을 취급하는 NPC를 찾아 대화하시면 아이템을 확인하실 수 있습니다.</h2>
		</template>
	</Modal>
	<Modal id="pop_imgSlider">
		<template v-slot:body>
			<ul class="pop_tab">
				<li class="tab1" :class="{'active': sliderTab === 'tab1'}"><a href="#" @click.prevent="sliderTab = 'tab1'"><span class="ir">영운-별빛 속삭임 자세히 보기</span></a></li>
				<li class="tab2" :class="{'active': sliderTab === 'tab2'}"><a href="#" @click.prevent="sliderTab = 'tab2'"><span class="ir">종이학 자세히 보기</span></a></li>
			</ul>
			<div class="pop_cont cont1" :class="{'active': sliderTab === 'tab1'}"><p class="blind">영운-별빛 속삭임 자세히 보기</p></div>
			<div class="pop_cont cont2" :class="{'active': sliderTab === 'tab2'}"><p class="blind">종이학 자세히 보기</p></div>
		</template>
	</Modal>
	<Modal id="pop_dialog">
		<template v-slot:body>
			<p class="text">{{ msg }}</p>
		</template>
		<template v-slot:footer>
			<button type="button" class="modal-btn-ok" @click="closeModal('pop_dialog')">확인</button>
		</template>
	</Modal>
	<transition name="fade">
	<div v-if="modal.order.length" class="modal-bg"></div>
	</transition>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { gsap } from 'gsap'
import Note from '@/components/common/Note.vue'
import Modal from '@/components/common/Modal.vue'
import SideBanner from '@/components/SideBanner.vue'
import initMixin from '@/mixins/init.mixin'

export default {
	name: 'contents',
	components: { SideBanner, Note, Modal },
	mixins: [ initMixin ],
	data: () => ({
		isVideoPlaying: false,
		sliderTab: 'tab1',
		videoId: '0CjLv3XfLTc'
	}),
	computed: {
		...mapGetters('event', [
			'info', 'notes', 'msg'
		]),
		...mapState('ui', [
			'modal'
		])
	},
	mounted() {
		this.$nextTick(() => {
			this.handleLoader()
			setTimeout(this.playVisualAnimation, 300)
		})
	},
	methods: {
		...mapActions('event', [
			'fetchEventInfo', 'fetchEventAttentions'
		]),
		...mapActions('ui', [
			'showModal', 'closeModal'
		]),
		handleLoader() {
			gsap.to('#wrap .loader', { delay: 0.3, duration: 0.6, opacity: 0, ease: 'sine.in',
				onComplete: (e) => {
					this.isPageLoaded = true
					// 테스트용으로 여기에 넣어 봄
					if (this.notes.length === 0) {
						this.fetchEventAttentions('17')
					}
				} 
			})
		},
		playVisualAnimation() {
			gsap.to('#sec1 .c1, #sec1 .c2', { delay: 1, duration: 0.3, opacity: 1, autoAlpha: 1, ease: 'sine.in' })
			gsap.fromTo('#sec1 .c1',
				{ x: 120, y: -10, rotation: 5, scale: 0.8 },
				{ delay: 1, duration: 1.9, x: 0, y: 0, rotation: 0, scale: 1, ease: 'elastic.out(1.2, 0.3)' }
			)
			gsap.fromTo('#sec1 .c2',
				{ x: -100, y: -10, rotation: -5, scale: 0.8 },
				{ delay: 1, duration: 1.9, x: 0, y: 0, rotation: 0, scale: 1, ease: 'elastic.out(1.2, 0.3)' }
			)
		},
		playVideo() {
			this.isVideoPlaying = true
		}
	}
}
</script>