import { gameInfo } from '@/config/event.config'
import { getChannel, getDevice } from '@/utils/helper'

let channel = getChannel()
let isMobile = getDevice() === 'mobile' ? true : false

const isAuthenticated = () => channel === 'NAVER' ? gdp.jslib.checkLogin() : NXMember.IsLogin()

const login = (goTo = location.href) => {
	if (isAuthenticated()) {
		alert('이미 로그인 중입니다.')
	} else {
		if (channel === 'NAVER') {
			gdp.jslib.goLogin()
		} else {
			if (isMobile) {
				location.href = `http://nxlogin.nexon.com/common/mlogin.aspx?sec=login&redirect=${goTo}`
			} else {
				NXMember.GoLogin({ 'redirect': goTo })
			}
		}
	}
}

const startGame = () => {
	if (isAuthenticated()) {
		// TODO: 네이버일 때 게임시작 구현부 체크 필요
		PS.game.startGame({ gameCode: gameInfo.code, param: gameInfo.param })

		$h.a2s.sendClickLog('gamestart', `{ "ID": "${gameInfo.logId}", "Name": "${gameInfo.logName}" }`)

		// TODO: 필요한 코드인지 체크 필요
		if (typeof gtmGameStartButton === 'function') {
			gtmGameStartButton()
		}
	} else {
		login()
	}
}

export {
	isAuthenticated,
	login,
	startGame
}