let commonPath = {
	js: 'http://js.nx.com/s1/closers/event/2020/',
	css: 'http://js.nx.com/s3/closers/event/2020/',
	image: 'http://s.nx.com/s2/game/closers/2020/events/'
}
let folderName = '200213_newpet_1115111115'

module.exports = {
	filePath: {
		js: `${commonPath.js}${folderName}`,
		css: `${commonPath.css}${folderName}`,
		image: `${commonPath.image}${folderName}`
	},
	folderName: folderName,
	fileName: {
		js: 'event.200213.ui.js',
		css: 'style.css',
		html: 'event.html'
	},
	opengraph: {
		title: '[클로저스] 펫 시스템 리뉴얼',
		desc: '서피드 펫 & 파이 펫 출시',
		author: 'NEXON',
		copyright: '&copy; 2014 NEXON Corp. &amp; Naddic Games. All Rights Reserved.',
		keywords: 'NEXON, 넥슨, NEXON Korea, 넥슨코리아, 클로저스',
		url: 'http://closers.nexon.com/events/2020/02/13/Pet.aspx',
		image: `${commonPath.image}${folderName}/img_sns.jpg`
	}
}