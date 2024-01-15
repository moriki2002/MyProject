<template>
	<div class="live2d">
		<canvas id="canvas_view"></canvas>
	</div>
</template>

<script>
	import '@/utils/live2d.min.js'
	import {main} from '@/assets/index.js'
	
	export default {
		data() {
			return {}
		},
		mounted() {
			this.$nextTick(() => {
				main().then()
			})
		}
	}
	
</script>

<style>
.live2d{
	position: fixed;
	right: 0px;
	bottom: 0px;
}
</style>