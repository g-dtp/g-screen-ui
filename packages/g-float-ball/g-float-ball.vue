<template lang='pug'>
	.g-float-ball(@mousedown.stop="onStart" :class="{active:active || open}" @click="onOpen")
		.g-float-ball__content
			svg.gs-icon.g-float-ball__close(aria-hidden="true")
				use(xlink:href="#gs-icon-ios-radio-button-off")
			g-float-ball-item(v-for="(item,index) in data"
			:key="index"
			:index="index"
			:item="item"
			:gap="gap"
			@click.native.stop="onItem(item, $event)"
			v-if='open')

</template>

<script>
	import GFloatBallItem from './g-floot-ball-item'

	export default {
		name: "g-float-ball",
		components: {GFloatBallItem},
		props: {
			size: {
				default: 50
			},
			data: {
				default: function () {
					return []
				}
			},
			paddingGap: {
				default: 100
			}
		},
		data() {
			return {
				active: false,
				open: false,
				move: false
			}
		},
		beforeCreate() {
			this._dp = {
				x: 0,
				y: 0,
			}
			this._deg = [-Math.PI / 2, Math.PI / 2]
			this._timer = null
		},
		computed: {
			gap() {
				return Math.PI / (this.data.length - 1)
			}
		},
		mounted() {

		},
		created() {

		},
		methods: {
			onOpen() {
				if (this.move) return
				this.open = !this.open
				if (this.open) {
					if (this._timer) clearTimeout(this._timer)
					this._timer = setTimeout(() => {
						this.open = false
					}, 300000)
				}
			},
			addEvents() {
				document.addEventListener('mousemove', this.onMove, true)
				document.addEventListener('mouseup', this.onEnd, true)
			},
			onStart(e) {
				e.preventDefault()
				this.active = true
				this.move = false
				this._dp.x = e.pageX - this.$el.offsetLeft
				this._dp.y = e.pageY - this.$el.offsetTop
				this.$el.style.transition = ''
				this.addEvents()
			},
			onMove(e) {
				if (this.open) return
				this.active = true
				this.move = true
				e.preventDefault()
				let el = this.$el
				let maxW = document.documentElement.clientWidth
				let maxH = document.documentElement.clientHeight
				let dx = e.pageX - this._dp.x
				let dy = e.pageY - this._dp.y
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
				document.removeEventListener('mousemove', this.onMove, true)
				document.removeEventListener('mouseup', this.onEnd, true)
			},
			resetPosition() {
				let left = this.$el.offsetLeft
				let t = 'transition: all .5s cubic-bezier(.5,0,.1,1);'
				let top = this.$el.offsetTop
				if (left > 0 && left < document.documentElement.clientWidth / 2) {
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
			}
		}
	}
</script>
