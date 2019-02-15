<template lang="pug">
	.g-loading__contain(v-if="loading" :id="'g-loading__'+uid")
		component(:is="lType")
		.g-loading__text(v-if="text") {{text}}
</template>

<script>
	import boun from './type/double-boun'
	import wave from './type/wave'
	import circles from './type/circle'

	export default {
		components: {
			boun,
			wave,
			circles
		},
		data() {
			return {}
		},
		props: ['type', 'loading', 'text'],
		computed: {
			lType() {
				return this.type || 'boun'
			}
		},
		beforeCreate() {
			this.uid = new Date().getTime()
		},
		mounted() {
			if(this.$el.parentElement){
				this.$el.parentElement.style.position = 'relative'
			}
		}
	}
</script>
