import axios from 'axios'
import { API } from '@/constant'

const state = {
	today: new Date(),
	targetDate: '',
	targetDt:'',
	rankList: null,
	isLoading: false,
	pageOptions: {
		totalCount: 0,
		itemPerPage: 5,
		currentPage: 1
	},
}

const mutations = {
	resetItems(state, { callback }) {
		state.targetDate = ''
		state.rankList = null

		this._vm.$message({
			message: '해당 일자의 데이터가 존재하지 않아 가장 최근 데이터를 다시 불러옵니다.',
			type: 'error',
			offset: 50,
			duration: 2000,
			onClose: () => {
				callback()
			}
		})
	},
	changeDate(state, { date, callback }) {
		state.targetDate = date
		callback()
	},
	changeCurrentPage(state, currentPage) {
		state.pageOptions.currentPage = currentPage
	},
}

const actions = {
	fetchItems({ state, getters, dispatch }) {
		let targetDt = (state.targetDate) ? state.targetDate.replace(/[^0-9]/g, '') : `${getters.year}${getters.month}${getters.date}`
		let promises = []

		state.isLoading = true
		axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API.KOBIS_KEY}&targetDt=${targetDt}`)
		.then((res) => {
			// 서버로부터 정상적으로 응답이 왔을 때 실행
			if (res.data.boxOfficeResult.dailyBoxOfficeList.length) {
				state.rankList = res.data.boxOfficeResult.dailyBoxOfficeList
				state.rankList.map((movie) => {
					let yearfrom = (movie.openDt && movie.openDt.trim() != '') ? movie.openDt.substr(0, 4) - 5 : getters.year
					let yearto = (movie.openDt && movie.openDt.trim() != '') ? movie.openDt.substr(0, 4) : getters.year
					promises.push(
						axios.get(`/api/v1/search/movie.json?query=${encodeURI(movie.movieNm)}&yearfrom=${yearfrom}&yearto=${yearto}&display=1&start=1`, {
							headers: {
								'X-Naver-Client-Id': API.NAVER_CLIENT_ID,
								'X-Naver-Client-Secret': API.NAVER_CLIENT_SECRET
							}
						})
					);
				})
				axios.all(promises)
				.then(axios.spread((...args) => {
					args.map((movie, idx) => {
						state.rankList[idx].imgPath = movie.data.items[0].image || require(`@/assets/default.png`)
						state.rankList[idx].naverLink = movie.data.items[0].link
						state.rankList[idx].director = movie.data.items[0].director
						state.rankList[idx].actor = movie.data.items[0].actor
						state.rankList[idx].userRating = movie.data.items[0].userRating
					})
					console.log('네이버 영화 이미지 데이터 박스오피스에 삽입 완료')
					state.pageOptions.totalCount = state.rankList.length
					state.isLoading = false
				}))
			} else {
				dispatch('resetItems')
			}
		})
		.catch((err) => {
			// 서버로부터 응답이 정상적으로 처리되지 못했을 때 실행
			dispatch('resetItems')
			console.log(err)
		})
	},
	resetItems({ commit, dispatch }) {
		commit('resetItems',
			{
				callback: () => {
					dispatch('fetchItems')
				}
			}
		)
	},
	changeDate({ commit, dispatch }, date) {
		commit('changeDate', 
			{
				date: date,
				callback: () => {
					dispatch('fetchItems')
				}
			}
		)
	},
	changeCurrentPage({ commit }, date) {
		commit('changeCurrentPage', date)
	}
}

const getters = {
	year(state) {
		return state.today.getFullYear()
	},
	month(state) {
		let month = state.today.getMonth() + 1
		return (month < 10) ? `0${month}` : month
	},
	date(state) {
		let date = state.today.getDate() - 1
		return (date < 10) ? `0${date}` : date
	},
	targetYear(state) {
		return state.targetDt.substring(0, 4)
	},
	topRankList(state) {
		return (limit) => {
			return state.rankList.filter(item => item.rank <= limit)
		}
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
