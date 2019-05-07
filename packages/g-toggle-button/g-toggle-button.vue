<template lang='pug'>
	.g-toggle-button(@click="onClick")
		slot(name="left")
		slot(name="label")
			span {{text}}
		.g-toggle-button__left.g-transition_toggle(:class="[classname]")
			slot(name="right")
				svg.gs-icon.gs-icon-md-arrow-dropdown(aria-hidden="true")
					use(xlink:href="#gs-icon-md-arrow-dropdown")

</template>

<script>
	export default {
		name: "g-button",
		model: {
			prop: 'toggle',
			event: 'change'
		},
		props: {
			toggle: {
				type: Boolean,
				default: false
			},
			text: {
				type: String,
				default: 'Button'
			}
		},
		computed: {
			classname() {
				return this.state ? 'g-transition_toggle__open' : 'g-transition_toggle__close'
			}
		},
		data() {
			return {
				state: this.toggle
			}
		},
		mounted() {
			window.addEventListener("click", this.closeByEvent, false);
		},
		beforeDestroy() {
			window.removeEventListener("click", this.closeByEvent, false);
		},
		methods: {
			onClick() {
				this.state = !this.state
				this.$emit('change', this.state)
			},
			closeByEvent() {
				this.state = false
				this.$emit('change', this.state)
			}
		}
	}
</script>
