<template lang='pug'>
	.g-select-tree(@click.stop="onToggle" @mousedown.stop="stop")
		.g-select-tree__label
			span.g-select-tree__text {{value[labelKey]?value[labelKey]:placeholder}}
			svg.gs-icon.gs-icon-md-arrow-dropdown.g-transition_toggle(aria-hidden="true" :class="[classname]")
				use(xlink:href="#gs-icon-ios-arrow-down")
		dropdown(v-if='open' :class="[selectClass]" @dropdown-leave="onLeave" )
			tree-item(v-for="item in data" :key="item[valueKey]" :option="item" :label="labelKey" )
</template>

<script>
	import Dropdown from './tree-dropdown'
	import TreeItem from './tree-item'
	export default {
		name: "g-select-tree",
		components:{Dropdown, TreeItem},
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			selectClass: {
				default:''
			},
			labelKey: {
				default:'label'
			},
			valueKey: {
				default:'value'
			},
			data: {
				default: function () {
					return []
				}
			},
			value: {
				default: function () {
					return {}
				}
			},
			placeholder: {
				default: '请选择'
			},
			show: {
				default: false
			}
		},
		computed: {
			classname() {
				return this.open ? 'g-transition_toggle__open' : 'g-transition_toggle__close'
			}
		},
		provide() {
			return {
				'reference': this
			};
		},
		data() {
			return {
				open: this.show
			}
		},
		methods:{
			onLeave(){},
			onToggle() {
				this.open = !this.open
			},
			handleClose() {
				this.open = false
			},
			onClickOption(option){
				this.$emit('change', option)
				this.handleClose()
			},
			stop(){}
		}
	}
</script>
