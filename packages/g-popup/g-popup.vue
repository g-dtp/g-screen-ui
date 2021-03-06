<template lang='pug'>
	.g-popup(:style="styleObj")
		transition(name="fade")
			.g-popup__mask(v-if="mask && isActive && position !== 'top'" @click="handleClose(maskClosable)")
		transition(:name="position")
			.g-popup__fixed(v-if="isActive" :class="[{ '__dark': position === 'top' }, position]")
				slot
</template>

<script>
	export default {
		name: "g-popup",
		model: {
			prop: 'show',
			event: 'change'
		},
		props: {
			fixed: {
				type: Boolean,
				default: false
			},
			show: {
				type: Boolean,
				default: false
			},
			position: {
				type: String,
				default: 'bottom'
			},
			mask: {
				type: Boolean,
				default: true
			},
			maskClosable: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				isActive: this.show
			};
		},
		computed: {
			styleObj() {
				return {
					position: this.fixed ? 'fixed' : 'absolute',
					alignItems: this.position == 'bottom' ? 'flex-end' : 'flex-start',
					zIndex: this.isActive ? 1000 : -1
				};
			}
		},
		watch: {
			show(v) {
				this.isActive = v;
				if (v && this.position == 'top') {
					setTimeout(() => {
						this.hide();
					}, 3000);
				}
			}
		},
		methods: {
			hide(){
				this.isActive = false;
				this.$emit('close', this.isActive);
				this.$emit('change', this.isActive);
			},
			handleClose(maskClosable = true) {
				if (maskClosable) {
					this.hide();
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.top-enter,
	.top-leave-to {
		transform: translate(0, -100%);
	}

	.bottom-enter,
	.bottom-leave-to {
		transform: translate(0, 100%);
	}

	.fade-enter-active {
		transition: opacity 0.3s ease;
	}

	.fade-leave-active {
		transition: opacity 0.3s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
	.g-popup
		width: 100%;
		display: flex;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		align-items: flex-end;
		justify-content: center;
		&__mask
			position fixed
			top: 0
			right: 0
			bottom: 0
			left: 0
			background-color: rgba(0, 0, 0, 0.4)
			height: 100%
			z-index: 2999
		&__fixed
			position relative
			z-index 3000
			background-color #fff
			transition transform 0.2s
			width 100%
		.bottom {
			right: 0;
			bottom: 0;
			left: 0;
			padding-bottom: env(safe-area-inset-bottom);
		}

		.top {
			top: 0;
			right: 0;
			left: 0;
			padding-top: env(safe-area-inset-bottom);
		}
		.__dark {
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(0, 0, 0, 0.3);
			color: #fff;
			height: 50px;
			font-size: 16px;
			min-height: 50px;
		}

</style>
