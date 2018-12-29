<template lang='pug'>
	transition(@after-enter="onAfterEnter" :duration="150" @before-leave="onBeforeLeave")
		.g-float-ball__item(:style="style" @mousedown.stop="onDown" @mouseup.stop="onUp" @click.stop="onItem")
			i.iconfont(:class="[item.icon]")

</template>

<script>
	export default {
		name: "g-floot-ball-item",
		props: {
			item: {
				default: function () {
					return {}
				}
			},
			index: {
				default: 0
			},
			size: {
				default: 50
			},
			direction: {
				default: 1
			},
			radius: {
				default: 70
			},
			gap: {
				default: 0
			},
			startDeg: {
				default: -Math.PI / 2
			}
		},
		data(){
			return {
				style: {}
			}
		},
		computed: {
			endPoint() {
				let deg = this.startDeg + this.gap * this.index
				return [Math.cos(deg) * this.radius, Math.sin(deg) * this.radius]
			}
		},
		methods: {
			onDown () {},
			onUp () {},
			onItem () {},
			onAfterEnter () {
				this.style = {
					transform: `translate(${this.endPoint[0]}px, ${this.endPoint[1]}px)`,
					opacity: 1
				}
			},
			onBeforeLeave (el) {
				el.style = `transition all .15s ease-in;transform:translate(0px, 0px);opacity:0;`
			}
		}
	}
</script>
