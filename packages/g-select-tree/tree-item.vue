<template lang='pug'>
	.g-select-tree__tree-item
		.g-select-tree__tree-item__label(:class="{'g-select-tree__tree-item__current': current}")
			.g-select-tree__tree-item__text(@click.stop="onItem(option)")
				slot(name="label")
					span {{option[label]}}
			.g-select-tree__tree-item__arrow.g-transition_toggle(v-if='showArrow' @click.stop="onToggle" :class="[classname]")
				svg.gs-icon.gs-icon-md-arrow-dropdown(aria-hidden="true")
					use(xlink:href="#gs-icon-ios-arrow-down")
		transition(name="g-list")
			.g-select-tree__tree-item__sub-warp(v-show='open')
				tree-item(v-for='item in option[children]' :key="item[value]" :option="item" :label="label" :class="{current:item == value}")

</template>

<script>
	import TreeItem from './tree-item'

	export default {
		name: "tree-item",
		components: {TreeItem},
		inject: ['reference'],
		props: {
			children: {
				type: String,
				default: 'children'
			},
			label: {
				type: String,
				default: 'label'
			},
			value: {
				type: String,
				default: 'value'
			},
			option: {
				type: Object,
				default: function () {
					return {}
				}
			}
		},
		data() {
			return {
				open:false
			}
		},
		watch:{
			open(value){
				this.$parent.open = value
			}
		},
		computed: {
			classname() {
				return this.open ? 'g-toggle-button__left__open' : 'g-toggle-button__left__close'
			}
		},
		mounted(){
			this.open = this.reference.value === this.option
		},
		computed:{
			current(){
				return this.reference.value === this.option
			},
			showArrow(){
				return this.option[this.children] && this.option[this.children].length> 0
			},
			classname() {
				return this.open ? 'g-transition_toggle__open' : 'g-transition_toggle__close'
			}
		},
		methods:{
			onItem(){
				this.reference.onClickOption(this.option)
			},
			onToggle(){
				this.open = !this.open
			}
		}
	}
</script>
