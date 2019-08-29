<template>

</template>

<script>
export default {
	data: () => ({
		monsters: []
	}),
	mounted () {
		if (localStorage.getItem('monsters')) {
			this.monsters = JSON.parse(localStorage.getItem('monsters'))
		}
	},
	methods: {
		addMonster () {
			localStorage.setItem('monsters', JSON.stringify(this.monsters))
		}
	}
}
</script>