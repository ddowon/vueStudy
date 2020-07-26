import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Candidate from '@/views/Candidate.vue'
import Replay from '@/views/Replay.vue'
import Winner from '@/views/Winner.vue'
import Notice from '@/views/Notice.vue'
import NoticeList from '@/components/notice/NoticeList.vue'
import NoticeView from '@/components/notice/NoticeView.vue'
import NoticeAdd from '@/components/notice/NoticeAdd.vue'
import NoticeUpdate from '@/components/notice/NoticeUpdate.vue'
import Error404 from '@/components/common/Error404.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		meta: { title: '메인' },
		component: Home
	},
	{
		path: '/about',
		name: 'about',
		meta: { title: '시상식 소개' },
		component: About
	},
	{
		path: '/candidate',
		name: 'candidate',
		meta: { title: '56회 후보자/작품' },
		// /candidate로 접근하면 candidate/tv로 redirect 처리
		redirect: { name: 'candidate_division', params: { division: 'tv' } }
	},
	{
		path: '/candidate/:division',
		name: 'candidate_division',
		meta: { title: '56회 후보자/작품' },
		props: true,
		component: Candidate
	},
	{
		path: '/candidate/:division/:prize_id',
		name: 'candidate_division_prize_id',
		meta: { title: '56회 후보자/작품' },
		props: true,
		component: Candidate
	},
	{
		path: '/replay',
		name: 'replay',
		meta: { title: '다시보기' },
		// replay로 접근하면 replay/56로 redirect 처리
		redirect: { name: 'replay_times', params: { replay_times: '56' } }
	},
	{
		path: '/replay/:replay_times',
		name: 'replay_times',
		meta: { title: '다시보기' },
		component: Replay,
	},
	{
		path: '/winner',
		name: 'winner',
		meta: { title: '역대 수상' },
		// /winner로 접근하면 winner/55로 redirect 처리
		redirect: { name: 'winner_times', params: { times: '55' } }
	},
	{
		path: '/winner/:times',
		name: 'winner_times',
		meta: { title: '역대 수상' },
		props: true,
		component: Winner
	},
	{
		path: '/notice',
		name: 'notice',
		meta: { title: '공지사항' },
		component: Notice,
		redirect: { name: 'notice_list', params: { page: '1' } },
		children: [
			{
				// path: '/notice/list/:page' 와 동일 (notice_list_page를 page로 줄여 쓴 이유는 이미 라우트 path에서 notice/list로 경로를 특정하고 있기 때문 - 동어반복이라 page로 줄임)
				// props: true 설정 시 route.params 정보를 설정한 컴포넌트의 props에 할당할 수 있음
				// 즉, NoticeList 컴포넌트에서 부모-자식 컴포넌트의 관계처럼 props: [ 'page' ]를 사용하면 this.$route.params.page와 동일한 값을 this.page로 축약 사용할 수 있음
				path: 'list/:page',
				name: 'notice_list',
				meta: { title: '공지사항 글 목록' },
				component: NoticeList,
				props: true
			},
			{
				// path: '/notice/view/:id' 와 동일
				// props: true 설정 시 route.params 정보를 설정한 컴포넌트의 props에 할당할 수 있음
				// 즉, NoticeView 컴포넌트에서 부모-자식 컴포넌트의 관계처럼 props: [ 'id' ]를 사용하면 this.$route.params.id와 동일한 값을 this.id로 축약 사용할 수 있음
				path: 'view/:id',
				name: 'notice_view',
				meta: { title: '공지사항 글 보기' },
				component: NoticeView,
				props: true
			},
			{
				// path: '/notice/add' 와 동일
				path: 'add',
				name: 'notice_add',
				meta: { title: '공지사항 글 쓰기', requireAuth: true },
				component: NoticeAdd
			},
			{
				// path: '/notice/update/:id' 와 동일
				path: 'update/:id',
				name: 'notice_update',
				meta: { title: '공지사항 글 수정', requireAuth: true },
				component: NoticeUpdate,
				props: true
			}
		]
	},
	{
		path: '/404',
		name: '404',
		component: Error404
	},
	{
		// 페이지가 없을 경우 404 화면으로 이동하도록
		path: '*',
		redirect: { name: '404' }
	}
]

export default routes