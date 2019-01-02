<template lang='pug'>
	.index
		.row
			g-select(@change="onChange" v-model="city" :data="list" )
		.row
			g-popover(trigger="event" :show='open' :autoClose="false")
				.button(slot='reference')
					g-toggle-button(text="服务站积分排行" v-model='open')
				.warp(slot="popper")
					ul
						li(v-for='item in 6') {{item}}
		.row
			g-select-tree(:data="tree" v-model="value")
		g-float-ball(:data="menu")
</template>

<script>
	import {GSelect, GPopover, GToggleButton, GSelectTree, GFloatBall} from 'packages/index'
	export default {
		name: "index",
		components:{GPopover, GSelect, GToggleButton, GSelectTree, GFloatBall},
		data(){
			return{
				open: false,
				city: '',
				value: '',
				menu:[
					{icon:'gs-icon-md-unlock'},
					{icon:'gs-icon-md-arrow-round-back'},
					{icon:'gs-icon-md-arrow-round-forwa'},
					{icon:'gs-icon-ios-apps'},
					{icon:''},
				],
				list: [
					{label: '杭州', value: '111101'},
					{label: '上海', value: '111102'},
					{label: '武汉', value: '111103'},
					{label: '南京', value: '111104'},
				],
				tree:[
					{label:'大区1', value:'1'},
					{label:'大区2', value:'2', children:[
							{label:'省份1', value:11, children:[
									{label:'城市1', value: '111'},
									{label:'城市2', value: '112'},
									{label:'城市3', value: '113'},
									{label:'城市4', value: '114'},
								]},
							{label:'省份2', value:12},
							{label:'省份3', value:13},
						]},
					{label:'大区3', value:'3', children:[
							{label:'省份1', value:11, children:[
									{label:'城市1', value: '111'},
									{label:'城市2', value: '112'},
									{label:'城市3', value: '113'},
									{label:'城市4', value: '114'},
								]},
							{label:'省份2', value:12},
						]},
					{label:'大区4', value:'4'},
				]
			}
		},
		methods:{
			onChange(){

			}
		}
	}
</script>

<style lang="stylus" scoped>
	.index
		.row
			margin 20px 0
</style>
