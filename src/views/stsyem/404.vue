<template>
	<div class="about-container">
		11111
	</div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
	mounted () {
		// 修改标题
		this.$parent.global.title = '关于'
		this.$parent.global.goBack = true
	}
}
</script>
