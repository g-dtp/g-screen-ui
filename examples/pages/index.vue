<template lang='pug'>
	.index
		.row
			g-select(@change="onChange" v-model="city" :data="list" )
		.row
			g-popover(trigger="event" :show='open')
				.button(slot='reference')
					g-toggle-button(text="服务站排名" v-model='open')
				.warp(slot="popper")
					ul
						li(v-for='item in 6') {{item}}

</template>

<script>
	import {GSelect, GPopover, GToggleButton} from 'packages/index'
	export default {
		name: "index",
		components:{GPopover, GSelect, GToggleButton},
		data(){
			return{
				open: false,
				city: '',
				value: '',
				list: [
					{label: '杭州', value: '111101'},
					{label: '上海', value: '111102'},
					{label: '武汉', value: '111103'},
					{label: '南京', value: '111104'},
				],
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
