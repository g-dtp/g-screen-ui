<template lang='pug'>
  .index
    .row
    g-select(@change="onChange" v-model="city" :data="list" )
    .row
      g-popover(trigger="event" :show='open' :autoClose="false")
        .button(slot='reference')
        g-toggle-button(text="����վ��������" v-model='open')
        .warp(slot="popper")
          ul
            li(v-for='item in 6') {{item}}
    .row
      g-select-tree(:data="tree" v-model="value")
    g-float-ball(:data="menu")
</template>

<script>
	import {GSelect, GPopover, GToggleButton, GSelectTree, GFloatBall, GLoading} from 'packages/index'
	export default {
		name: "index",
		components:{GPopover, GSelect, GToggleButton, GSelectTree, GFloatBall, GLoading},
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
					{label: '选项1', value: '111101'},
					{label: '选项2', value: '111102'},
					{label: '选项3', value: '111103'},
					{label: '选项4', value: '111104'},
				],
				tree:[
					{label:'����1', value:'1'},
					{label:'����2', value:'2', children:[
							{label:'ʡ��1', value:11, children:[
									{label:'����1', value: '111'},
									{label:'����2', value: '112'},
									{label:'����3', value: '113'},
									{label:'����4', value: '114'},
								]},
							{label:'ʡ��2', value:12},
							{label:'ʡ��3', value:13},
						]},
					{label:'����3', value:'3', children:[
							{label:'ʡ��1', value:11, children:[
									{label:'����1', value: '111'},
									{label:'����2', value: '112'},
									{label:'����3', value: '113'},
									{label:'����4', value: '114'},
								]},
							{label:'ʡ��2', value:12},
						]},
					{label:'����4', value:'4'},
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
