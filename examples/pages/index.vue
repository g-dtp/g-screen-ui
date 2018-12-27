<template lang='pug'>
	.index
		.row
			g-select(@change="onChange" v-model="city" :data="list" )
</template>

<script>
	import {GSelect} from 'packages/index'
	export default {
		name: "index",
		components:{GSelect},
		data(){
			return{
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

</style>
