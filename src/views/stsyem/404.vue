<template>
	<div class="null-container">
		<div class="content">
			<img src="../../assets/images/error.png"><br/>
			<div class="text">抱歉!  您访问的页面<i>失联</i>啦...</div>
			<div class="back">您可以回到：<router-link to="/">首页</router-link></div>
		</div>
	</div>
</template>

<script>
export default {
	mounted () {
	}
}
</script>
<style lang="less">
	@import '../../assets/less/define.less';
	.null-container{background:#fff;height:100%;
		.content{padding-top: @rem*200;text-align: center;
			.text{margin-top: @rem*15; .font-dpr(18);
				i{color: #ee8145;}
			}
			.back{margin-top: @rem*15; .font-dpr(14);}
		}
	}
</style>