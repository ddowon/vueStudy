<template>
    <section class="">

     	<h2 class="">개별 프로젝트 보기</h2>
		<template v-if="isLoading">
			<p>로딩중입니다.</p>
		</template>
		<template v-else-if="projectList.length && projectList.length">
			<ListTable :list="projectList"/>
		</template>
    </section>
  </template>

  <script>

  import ListTable from '@/components/ListTable.vue'

  export default {
    components: { ListTable },
    data: () => ({
		userId: 0,
      	isLoading: false,
		projectList: []
    }),
    computed: {

    },
    created() {
		this.fetchItems()
    },
	mounted() {
		console.log(this.$route.params.id)
	},
    methods: {
      fetchItems() {
        let promises = []

        this.isLoading = true
        this.axios.get(`http://webteam-calendar.herokuapp.com/team/${this.$route.params.id}`)
        .then((res) => {

			if (res.data.length) {	
				this.projectList = res.data
				this.projectList.sort((a, b) => {
					return new Date(b.open) - new Date(a.open)
				})
				this.isLoading = false
			}
        })
        .catch((err) => {
			// 서버로부터 응답이 정상적으로 처리되지 못했을 때 실행
			this.isLoading = false
        })
      }
    }
  }
  </script>

<style lang="scss" scoped>
.boxOfficeMovieSection {
	padding: 40px;
	.section-title {
		font-size: 1.5rem;
		padding: 0 0 1.25rem;
		line-height: 1.5rem;
		display: inline-block;
		white-space: normal;
		p.lead {
			display: inline;
			padding-left: .625rem;
			font-size: .8125rem;
			vertical-align: middle;
			color: #6e6e6e
		}
	}
}
.movie-item {
	position: relative;
	display: block;
	transition: transform .3s;
	&:hover {
		-webkit-transform: translateY(-6px);
		transform: translateY(-6px)
	}
}
.movie-item__image {
	position: relative;
	display: block;
	overflow: hidden;
	background-color: #000;
	border-radius: .25rem;
	transition: box-shadow .4s;
	&:before {
		content: '';
		padding-top: 244px;
		float: left
	}
	&:after {
		content: '';
		display: block;
		clear: both
	}
	img.image-cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		-o-object-fit: cover;
		object-fit: cover;
		font-family: "object-fit: cover;";
		border: 0;
		&:after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 3px;
			z-index: 1;
			background-color: #000;
		}
	}
}
.movie-item__info {
	padding: 1rem 0 0 .1875rem
}
.movie-item__info-title {
	width: auto;
	position: relative;
	display: block;
	color: #ededed;
	line-height: 140%;
	font-size: 15px
}
.movie-item__info-subtitle {
	width: 100%;
	color: #6e6e6e;
	line-height: 1rem;
	margin-top: 3px;
	line-height: 120%;
	font-size: .8rem
}
.movie-item__info-title,
.movie-item__info-subtitle {
	overflow: hidden;
	word-wrap: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
.movie-item__info-action {
	display: inline-block;
	margin: .625rem 0 0;
	padding: 0 1em;
	font-size: .8125rem;
	line-height: 2rem;
	color: #888;
	background-color: #303030;
	border-radius: 6.25rem
}
.movie-item__image-rank {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 2.375rem;
	height: 2.375rem;
	text-align: center;
	line-height: 2.375rem;
	font-size: 1.125rem;
	font-weight: 700;
	border-top-left-radius: .25rem;
	border-bottom-right-radius: .25rem;
	color:#ededed;
	background-color: rgba(104,68,230,.9);
	&.top {
		background-color: #f44336;
	}
}
</style>
