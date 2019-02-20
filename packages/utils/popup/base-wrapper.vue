<script>
	import PopupManager from './popup-manager.js'
	import {uid} from '../utils'

	export default {
		name: "base-wrapper",
		props: {
			uid: String,
			position: String,
			gap: Number,
			data: [String, Array, Object, Number]
		},
		inject: ['reference'],
		data() {
			return {
				show: false,
				styleObj: {},
				classname: ''
			}
		},
		beforeCreate() {
			this._uid = uid()
		},
		mounted() {
			this.createWrapper()
			this.$nextTick(()=>{
				this.setPosition()
			})
		},
		beforeDestroy() {
			this.$emit('beforeDestroy')
		},
		destroyed() {
			this.$emit('destroyed')
			PopupManager.getInstance().close(this._uid)
		},
		methods: {
			createWrapper() {
				PopupManager.getInstance().register({
					popper: this,
					uid: this._uid
				})
				document.body.appendChild(this.$el)
			},
			setPosition(){
				let {classname ,top, left} = this.makePosition()
				this.styleObj = {top, left, position:'fixed'}
				this.classname = classname
			},
			makePosition() {
				if(!this.$el) return
				let popover = this.$el.getBoundingClientRect()
				let rect = this.reference.$el.getBoundingClientRect()
				let view = document.documentElement.getBoundingClientRect()
				let h = 'left'
				let v = 'bottom'
				h = rect.left + popover.width >= view.width ? 'right' : 'left'
				v = rect.top < popover.height >= view.height ? 'top' : 'bottom'
				let x = h === 'right' ? (rect.left + rect.width) - popover.width : rect.left
				let y = v === 'top' ? (rect.top + rect.height) - popover.height : rect.top + rect.height
				return {
					classname: `popover-${h}-${v}`,
					left: x + 'px',
					top: y + 'px'
				}
			},
		}
	}
</script>
