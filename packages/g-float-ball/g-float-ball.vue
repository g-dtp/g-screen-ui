<template lang='pug'>
	.g-float-ball(
	@touchstart.stop.prevent='onStart'
	:class="{active:active || open}" @click="onOpen" style="touch-action:none")
		.g-float-ball__content
			svg.gs-icon.g-float-ball__close(aria-hidden="true" v-if="!open")
				use(xlink:href="#gs-icon-ios-radio-button-off")
			svg.gs-icon.g-float-ball__close(aria-hidden="true" v-if="open")
				use(xlink:href="#gs-icon-guanbi1")
			g-float-ball-item(v-for="(item,index) in data"
			:key="index"
			:index="index"
			:item="item"
			:gap="gap"
			:size='size'
			:startDeg='startDeg'
			:direction='direction'
			@click.native.stop="onItem(item, $event)"
			v-if='open')

</template>

<script>
	import GFloatBallItem from './g-floot-ball-item'
	import AlloyFinger from 'alloyfinger'
	export default {
		name: "g-float-ball",
		components: {GFloatBallItem},
		props: {
			data: {
				default: function () {
					return []
				}
			},
			paddingGap: {
				default: 200
			}
		},
		data() {
			return {
				active: false,
				open: false,
				move: false,
				direction: 1,
				size: 0,
			}
		},
		beforeCreate() {
			this._dp = {
				x: 0,
				y: 0,
			}
			this._timer = null
			this._af = ''
		},
		computed: {
			gap() {
				let num = this.data.length
				return Math.PI * (num / 5) / (num - 1)
			},
			startDeg() {
				let num = this.data.length
				return -Math.PI / 2
			}
		},
		mounted() {
			this.initAlloyFinger()
			this.resetPosition()
			this.size = this.$el.clientWidth
		},
		methods: {
			initAlloyFinger(){
				let vm = this
				this._af = new AlloyFinger(this.$el, {
					tap: function () {
						vm.onOpen()
					},
				})
			},
			onOpen() {
				if (this.move) return
				if (this.$el.offsetLeft < document.documentElement.clientWidth / 2) {
					this.direction = 1
				} else {
					this.direction = -1
				}
				this.open = !this.open
				if (this.open) {
					if (this._timer) clearTimeout(this._timer)
					this._timer = setTimeout(() => {
						this.open = false
					}, 5000)
				}
			},
			addEvents() {
				// document.addEventListener('mousemove', this.onMove, true)
				// document.addEventListener('mouseup', this.onEnd, true)
				document.addEventListener('touchmove', this.onMove, {passive: false})
				document.addEventListener('touchend', this.onEnd, {passive: false})
			},
			onStart(e) {
				if (this.open) return
				e.preventDefault()
				let target = e
				if (e.targetTouches) {
					target = e.targetTouches[0]
				}
				this.active = true
				this.move = false
				this._dp.x = target.pageX - this.$el.offsetLeft
				this._dp.y = target.pageY - this.$el.offsetTop
				this.$el.style.transition = ''
				this.addEvents()
			},
			onMove(e) {
				if (this._timer) clearTimeout(this._timer)
				this._timer = setTimeout(() => {
					this.moving(e)
				})
			},
			moving(e) {
				if (this.open) return
				this.active = true
				this.move = true
				e.preventDefault()
				let target = e
				if (e.targetTouches) {
					target = e.targetTouches[0]
				}
				let el = this.$el
				let maxW = document.documentElement.clientWidth
				let maxH = document.documentElement.clientHeight
				let dx = target.pageX - this._dp.x
				let dy = target.pageY - this._dp.y
				if (dx < 0) {
					dx = 0
				} else if (dx > maxW - el.clientWidth) {
					dx = maxW - el.clientWidth
				}
				if (dy < 0) {
					dy = 0
				} else if (dy > maxH - el.clientHeight) {
					dy = maxH - el.clientHeight
				}
				el.style.left = dx + 'px';
				el.style.top = dy + 'px';
			},
			onEnd(e) {
				this.active = false
				this.resetPosition()
				// document.removeEventListener('mousemove', this.onMove, true)
				// document.removeEventListener('mouseup', this.onEnd, true)
				document.removeEventListener('touchmove', this.onMove, true)
				document.removeEventListener('touchend', this.onEnd, true)
			},
			resetPosition() {
				let left = this.$el.offsetLeft
				let t = 'transition: all .5s cubic-bezier(.5,0,.1,1);'
				let top = this.$el.offsetTop
				if (left >= 0 && left < document.documentElement.clientWidth / 2) {
					left = 0
				} else {
					left = document.documentElement.clientWidth - this.$el.clientWidth
				}
				if (top < this.paddingGap) {
					top = this.paddingGap
				} else if (top > document.documentElement.clientHeight - this.paddingGap) {
					top = document.documentElement.clientHeight - this.paddingGap
				}
				this.$el.style = `${t};left:${left}px;top:${top}px`
			},
			onItem(item, e) {
				e.stopPropagation()
				e.preventDefault()
				this.$emit('command', item)
				this.open = false
			}
		}
	}
</script>
