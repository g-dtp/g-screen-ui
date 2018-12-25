<template lang="pug">
	.hello
		h1 {{ msg }}
		h2 Essential Links
		ul
			li
				a(href="https://vuejs.org" target="_blank") Core Docs
			li
				a(href="https://vuejs.org" target="_blank") Core Docs
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
