<template lang='pug'>
	.g-tooltip
		slot
		span.tooltip {{titleContent}}

</template>

<script>
	export default {
		name: "g-button",
		props: ['titleContent']
	}
</script>
<style  lang="stylus" scoped>
	.g-tooltip
		display: inline-block
		position: relative
		z-index: 2
		.tooltip
			display: none
			padding: 2px
			background: #000
			color: #fff
			font-size: 10px
			position: absolute
			min-width: 150px
			text-align: center
			top: 65px
			right: -55px
			line-height: 0.4rem
			border-radius: 10px
		.tooltip:after
			position:absolute;
			content:"";
			height:0;
			width: 0;
			pointer-events: none;
			border: solid transparent;
			border-color: rgba(136, 183, 213, 0);
			border-bottom-color: #000;
			border-width: 10px;
			left: 50%;
			margin-left: -10px;
			bottom: 100%;
	.g-tooltip:hover
		.tooltip
			display: inline-block
</style>
