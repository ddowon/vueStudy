const commonPath = {
	js: 'http://js.nx.com/s1/closers/event/2020/',
	css: 'http://js.nx.com/s3/closers/event/2020/',
	image: 'http://s.nx.com/s2/game/closers/2020/events/',
}
const folderName = '200409_update_1572924'

module.exports = {
	filePath: {
		js: `${commonPath.js}${folderName}`,
		css: `${commonPath.css}${folderName}`,
		image: `${commonPath.image}${folderName}`
	},
	folderName: folderName,
	fileName: {
		js: 'event.200409.ui.js',
		css: 'style.css',
		html: 'event.html'
	},
	opengraph: {
		title: '[클로저스] 서버/클라이언트 64비트 UPDATE',
		desc: '마침내 ‘진짜 갓겜’으로!',
		author: 'NEXON',
		copyright: '&copy; 2014 NEXON Corp. &amp; Naddic Games. All Rights Reserved.',
		keywords: 'NEXON, 넥슨, NEXON Korea, 넥슨코리아, 클로저스',
		url: 'http://closers.nexon.com/events/2020/04/09/Update.aspx',
		url_naver: 'http://closers.nexon.game.naver.com/events/2020/04/09/Update.aspx',
		image: `${commonPath.image}${folderName}/img_sns.jpg`
	},
	gameInfo: {
		code: 106497,
		param: '_C http://closers.dn.nexoncdn.co.kr/CLOSERS_LIVE_NEXON/ _L 211.39.129.134 _SI 430011494',
		logId: '202004091',
		logName: '/events/2020/04/09/Update.aspx'
	}
}