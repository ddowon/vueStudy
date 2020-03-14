<template>
<Fragment>
	<transition name="fade">
		<div v-if="!isPageLoaded" class="loader"></div>
	</transition>
	<div id="contents" :style="`width:${contentsWidth}`">
		<div id="visual" class="section"></div>
		<div id="section0" class="section"></div>

		<div id="section1" class="section">
			<div class="innerWrap">
				<div class="expandEvent">
					<div class="missionList">
						<ul class="clearFix">
							<li class="dep1 m0">
								<div class="missionInfo">
									<dl>
										<dt class="blind">내 클리어 횟수</dt>
										<!-- S : 내 클리어 횟수를 입력해 주세요 -->
										<dd class="count">0<span>/5</span></dd>
										<!-- E : 내 클리어 횟수를 입력해 주세요 -->
									</dl>
								</div>
								<div class="benefit">
									<ul class="clearFix">
										<li class="item0">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
											<!-- S : 쿠폰 소진 여부 : 로그인 전 -->
											<p class="state beforeLogin">생성된 캐릭터가 없습니다.</p>
											<!-- E : 쿠폰 소진 여부 : 로그인 전 -->
										</li>
										<li class="item1">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
										</li>
									</ul>
								</div>
							</li>
							<li class="dep1 m1">
								<div class="missionInfo">
									<dl>
										<dt class="blind">내 클리어 횟수</dt>
										<!-- S : 내 클리어 횟수를 입력해 주세요 -->
										<dd class="count">0<span>/5</span></dd>
										<!-- E : 내 클리어 횟수를 입력해 주세요 -->
									</dl>
								</div>
								<div class="benefit">
									<ul class="clearFix">
										<li class="item0">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
											<!-- S : 쿠폰 소진 여부 : 로그인 후 -->
											<p class="state beforeLogin">생성된 캐릭터가 없습니다.</p>
											<!-- E : 쿠폰 소진 여부 : 로그인 후 -->
										</li>
										<li class="item1">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
										</li>
									</ul>
								</div>
							</li>
							<li class="dep1 m2">
								<div class="missionInfo">
									<dl>
										<dt class="blind">내 클리어 횟수</dt>
										<!-- S : 내 클리어 횟수를 입력해 주세요 -->
										<dd class="count">0<span>/5</span></dd>
										<!-- E : 내 클리어 횟수를 입력해 주세요 -->
									</dl>
								</div>
								<div class="benefit">
									<ul class="clearFix">
										<li class="item0">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
											<!-- S : 쿠폰 소진 여부 : 로그인 후 -->
											<p class="state beforeLogin">생성된 캐릭터가 없습니다.</p>
											<!-- E : 쿠폰 소진 여부 : 로그인 후 -->
										</li>
										<li class="item1">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
										</li>
									</ul>
								</div>
							</li>
							<li class="dep1 m3">
								<div class="missionInfo">
									<dl>
										<dt class="blind">내 클리어 횟수</dt>
										<!-- S : 내 클리어 횟수를 입력해 주세요 -->
										<dd class="count">0<span>/10</span></dd>
										<!-- E : 내 클리어 횟수를 입력해 주세요 -->
									</dl>
								</div>
								<div class="benefit">
									<ul class="clearFix">
										<li class="item0">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
											<p class="state beforeLogin">생성된 캐릭터가 없습니다.</p>
										</li>
										<li class="item1">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
										</li>
									</ul>
								</div>
							</li>
							<li class="dep1 m4">
								<div class="missionInfo">
									<dl>
										<dt class="blind">내 클리어 횟수</dt>
										<!-- S : 내 클리어 횟수를 입력해 주세요 -->
										<dd class="count">0<span>/10</span></dd>
										<!-- E : 내 클리어 횟수를 입력해 주세요 -->
									</dl>
								</div>
								<div class="benefit">
									<ul class="clearFix">
										<li class="item0">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
											<p class="state beforeLogin">생성된 캐릭터가 없습니다.</p>
										</li>
										<li class="item1">
											<p class="btn get">
												<button type="button" class="btnGetItem btnOnOffType btnDoneType" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
											</p>
										</li>
									</ul>
								</div>
							</li>
						</ul>

						<p class="btn myList">
							<button type="button" class="btnOpenItemList" data-n1requesttype="-3" data-n4eventseq="-3" data-ispayments="-3" data-msg="캐릭터 정보가 없습니다.">버튼</button>
						</p>
					</div>

					<Note id="note1" :item="notes[0]" v-if="notes[0]" />
				</div>

				<div class="updateEvent">
					<Note id="note2" :item="notes[1]" v-if="notes[1]" />
				</div>
			</div>
		</div>

		<div id="section2" class="section"></div>

	</div><!-- // #contents END -->

	<!-- 모달창 모음 시작 -->
	<Modal id="pop_choiceChar">
		<template v-slot:body>
			<strong class="blind">아이템을 받을 캐릭터를 선택해 주세요.</strong>
			<div class="customSelect">
				<p class="txt">캐릭터를 선택해주세요</p>
				<select id="selCharacterList">
					<option>로그인이 필요한 서비스입니다.</option>
				</select>
			</div>
		</template>
		<template v-slot:footer>
			<p class="btn confirm">
				<button type="button" class="btnItemPayments" @click="closeModal('pop_choiceChar')">확인</button>
			</p>
		</template>
	</Modal>

	<Modal id="pop_itemClear">
		<template v-slot:body>
			<div class="blind">
				<strong>아이템 지급 완료</strong>
				<p>내가 받은 아이템은 선택한 캐릭터의 인게임 우편함으로 약 10분후 지급됩니다.</p>
			</div>
		</template>
		<template v-slot:footer>
			<p class="btn confirm">
				<button type="button" class="btnLocationReload" @click="closeModal('pop_itemClear')">확인</button>
			</p>
		</template>
	</Modal>

	<Modal id="pop_winList">
		<template v-slot:body>
			<div class="tableArea">
				<table>
					<caption>내가 받은 아이템 리스트</caption>
					<colgroup>
						<col style="width:15.0%">
							<col style="width:30.3%">
								<col style="width:54.7%">
					</colgroup>
					<thead class="blind">
						<tr>
							<th scope="col">당첨 일시</th>
							<th scope="col">캐릭터명</th>
							<th scope="col">아이템명</th>
						</tr>
					</thead>
					<tbody>

					</tbody>
				</table>
			</div>
		</template>
		<template v-slot:footer>
			<p class="btn confirm">
				<button type="button" class="btnCloseItemList" @click="closeModal('pop_winList')">확인</button>
			</p>
		</template>
	</Modal>

	<Modal id="pop_nexonCash">
		<template v-slot:body>
			<p class="pin" id="nexonCashNum">000000000</p>
		</template>
		<template v-slot:footer>
			<p class="btn confirm">
				<button type="button" class="btnLocationReload" @click="closeModal('pop_nexonCash')">확인</button>
			</p>
		</template>
	</Modal>

	<Modal id="pop_dialog">
		<template v-slot:body>
			<p class="text">{{ msg }}</p>
		</template>
		<template v-slot:footer>
			<button type="button" class="btnMessageBoxClose" @click="closeModal('pop_dialog')">확인</button>
		</template>
	</Modal>
	<!-- 모달창 모음 끝 -->

	<transition name="modal-fade">
		<div v-if="modal.order.length" class="modal-bg"></div>
	</transition>

</Fragment>
</template>

<script>
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
		isVideoPlaying: false,
		sliderTab: 'tab1',
		videoId: '5YbUdIUfP1k'
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
		setTimeout(() => {
			this.isPageLoaded = true
		}, 1000)

		// 임시 제거
		this.fetchEventAttentions(17)
	},
	methods: {
		...mapActions('event', [
			'fetchEventInfo', 'fetchEventAttentions'
		]),
		...mapActions('ui', [
			'showModal', 'closeModal'
		]),
		playVideo() {
			this.isVideoPlaying = true
		}
	}
}
</script>