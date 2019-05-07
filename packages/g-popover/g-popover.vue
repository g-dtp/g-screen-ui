<template lang='pug'>
	span.g-popover(@click.stop="onToggle" @mousedown.stop="stop")
		slot(name="reference")
		g-popover-wrapper(v-if="open" :content="content" :style="{maxWidth:maxWidth+'px'}")
			slot(name="popper")

</template>

<script>
	import GPopoverWrapper from './g-popover-wrapper'

	export default {
		name: "g-popover",
		components: {GPopoverWrapper},
		props: {
			autoClose: {
				type: Boolean,
				default: true
			},
			trigger: {
				type: String,
				default: 'click',
				validate: value => ['click', 'event'].indexOf(value) > -1
			},
			show: {
				type: Boolean,
				default: false
			},
			content: String,
			position: {
				type: String,
				default: 'bottom'
			},
			maxWidth:{
				default:600
			}
		},
		provide() {
			return {
				'reference': this
			};
		},
		watch:{
			show(value) {
				this.open = value
				if (this.open && this.autoClose) {
					this.addAutoClose()
				}
			}
		},
		data() {
			return {
				open: this.show,
				timer: null
			}
		},
		computed: {},
		mounted() {
			window.addEventListener("click", this.closeByEvent, false);
		},
		beforeDestroy() {
			window.removeEventListener("click", this.closeByEvent, false);
		},
		methods: {
			onToggle() {
				if (this.trigger === 'event') return
				this.open = !this.open
				if (this.open && this.autoClose) {
					this.addAutoClose()
				}
			},
			addAutoClose() {
				if (this.timer) clearTimeout(this.timer)
				let vm = this
				this.timer = setTimeout(() => {
					vm.open = false
					vm.$emit('auto-close')
				}, 3000)
			},
			stop() {},
			closeByEvent() {
				this.open = false
			}
		}
	}
</script>
