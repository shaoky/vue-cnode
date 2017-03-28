<template>
	<div class="about-container">
		<v-header title="关于我们"></v-header>
		<p style="font-size:14px;">基于vue.js重写Cnodejs.org社区的webapp</p>
	</div>
</template>

<script>
import vHeader from '../../components/header'
export default {
	components: {
		vHeader
	}
}
</script>
<style lang="less">
	@import '../../assets/less/define.less';
	.about-container{background: #fff;padding:@rem*20; margin-top: 40px;
		p{line-height: 2;}
	}
</style>