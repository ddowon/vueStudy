<template>
	<div id="wrap" :class="`_${currentTab}`">
		<SideBanner />
		<div v-show="isLoading" class="loader"></div>
		<div class="visual">
			<div class="blind">
				<h2>창해의 로망스 코스튬</h2>
				<p>푸른 바다에서 펼쳐지는 두근두근 로맨스!?</p>
			</div>
			<div class="innerWrap">
				<div class="char">
					<div class="c1"></div>
					<div class="c2"></div>	
				</div>
				<div class="title">
					<div class="t1"></div>
					<div class="t2"></div>
					<div class="sub">
						<p class="s1"></p>
						<p class="s2"></p>
						<p class="s3"></p>
					</div>
				</div>
				<div class="bg"></div>
				<div class="floatMenu" :class="`_${currentTab}`">
					<ul>
						<li v-for="(tab, index) in tabs" :key="tab.name" @click="changeTab(index)" :class="{on : currentTab === index}"><button type="button">{{tab.name}}</button></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="section" id="section0" :class="{on : currentTab === 0}" >
			<div class="blind">
				<h3>일러스트</h3>
			</div>
			<div class="innerWrap">
				<div class="charNav">
					<ul>
						<li v-for="(char, idx) in charArr" :key="char.name" :class="{on : currentChar === idx}">
							<button type="button" @click="changeChar(idx)">{{char.name}}</button>
						</li>
					</ul>
				</div>
				<div class="costumeDetail">
					<ul class="typeBtns">
						<li v-for="cnt in typeCnt" :key="cnt" :class="{on : cnt === charType}">
							<button type="button" @click="changeType(cnt)"></button>
						</li>
					</ul>
					<div class="commDir">
						<p class="btn prev">
							<button type="button" @click="prevView()">이전</button>
						</p>
						<p class="btn next">
							<button type="button" @click="nextView()">다음</button>
						</p>
					</div>
					<ul class="costumeChar">
						<!-- 캐릭터들 코스튬 뷰-->
						<li v-for="(char, idx) in charArr" :key="char.name" :class="{on : idx === currentChar}">
							<ul class="img_char">
								<!-- 캐릭터 하나 타입 4종  -->
								<li v-for="cnt in typeCnt" :key="cnt" :class="{on : cnt === charType}">
									<img :src="require(`@/assets/${char.name}/img_${cnt}.png`)" :alt="char.name">
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="section" id="section1" :class="{on : currentTab === 1}">
			<div class="blind">
				<h3>코스튬 사양, 판매안내</h3>
			</div>
			<div class="innerWrap">
			</div>
		</div>
		<div class="footer"></div>
		<!-- S : 시스템 대체 팝업 -->
		<div class="layerPop" id="popAlert" style="display:none">
			<p class="text">이미 받아가신 기록이 있는걸요?<br>다시 확인 해 보세요.</p>
			<p class="btn close"><button type="button">닫기</button></p>
			<p class="btn confirm"><button type="button">확인</button></p>
		</div>
		<!-- E : 시스템 대체 팝업 -->
		<div class="overlay"></div>
	</div>
</template>

<script>
import '@/styles/style.css'
import SideBanner from '@/components/SideBanner.vue'
import { gsap } from "gsap";

export default {
	props: {
	},
	components: { SideBanner },
	data: () => ({
		isLoading: true,
		tabs: [
			{name: '일러스트'},
			{name: '코스튬 사양 / 판매 안내'}
		],
		currentTab: 0,
		currentChar: 0,
		typeCnt: 4,
		charType: 1,
		charArr: [{
			name : 'j',
		}, {
			name : 'mis',
		}, {
			name : 'revia',
		}, {
			name : 'violet',
		}, {
			name : 'luna',
		}, {
			name : 'seth2',
		}]
	}),
	mounted(){
		this.$nextTick(()=>{
			gsap.to('.loader', {opacity: 0, duration: 0.8 , onComplete: ()=>{
				this.isLoading = false
				this.visualAnimate()
			}})
		})
	},
	methods: {
		changeTab(idx) {
			this.currentTab = idx
		},
		changeChar(idx) {
			this.currentChar = idx
			this.charType = 1
		},
		changeType(cnt) {
			this.charType = cnt
		},
		prevView() {
			if (this.currentChar != 0){
				this.currentChar -= 1
				this.charType = 1
			}else if (this.charType != 1) {
				this.charType -= 1
			}
		},
		nextView() {
			if(this.charType != this.typeCnt){
				this.charType += 1
			} else if ( this.currentChar != this.charArr.length-1 ){
				this.currentChar += 1
				this.charType = 1
			}
		},
		visualAnimate() {
			gsap.to('.title .t1', {opacity: 1, duration: 3, delay: 1})
			gsap.to('.title .t2', {width:265, opacity: 1, duration: 2, delay: 1.5})

			gsap.to('.title .sub .s1', {opacity: 1, duration: 3, delay: 2.4})
			gsap.to('.title .sub .s2', {y: 70, opacity: 1, duration: 2, delay: 1.3})
			gsap.to('.title .sub .s3', {y: -70, opacity: 1, duration: 2, delay: 1})

			gsap.to('.visual .c1', {x: -119, duration: 2, opacity:1, ease: 'Power2.easeOut'})
			gsap.to('.visual .c2', {x: 121, duration: 2,  opacity:1, ease: 'Power2.easeOut'})

			gsap.to('.visual .bg', {delay: 3, duration: 8, opacity: 1, ease: 'elastic.out(1, 0.3)'})
		}
	}

}
</script>