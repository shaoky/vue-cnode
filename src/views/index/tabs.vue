<template>
	<nav class="nav">
		<ul>
			<li v-for="(item, index) in list" @click="navClick(index)">
				<router-link :to="item.path">{{item.title}}</router-link>
			</li>
		</ul>
		<div class="moving" :style="movingWidth"></div>
	</nav>
</template>

<script>
import $ from 'webpack-zepto'

export default {
	data () {
		return {
			list: [
				{
					title: '全部',
					path: '/?tab=all'
				},
				{
					title: '精华',
					path: '/?tab=good'
				},
				{
					title: '分享',
					path: '/?tab=share'
				},
				{
					title: '问答',
					path: '/?tab=ask'
				},
				{
					title: '招聘',
					path: '/?tab=job'
				}
			],
			browserWidth: null,
			translateValue: null,
			navWidth: null
		}
	},
	computed: {
		movingWidth () {
			return {
				width: this.navWidth + 'px',
				transform: 'translateX(' + this.translateValue + 'px)'
			}
		}
	},
	mounted () {
		this.refresh()
		window.addEventListener('resize', this.refresh)
	},
	methods: {
		navClick (index) {
			this.translateValue = index * this.navWidth
			$('.nav ul li').eq(index).addClass('active').siblings().removeClass('active')
		},
		refresh () {
			this.browserWidth = document.body.clientWidth
			this.navWidth = this.browserWidth / this.list.length
		}
	}
}
</script>
<style lang="less">
	@import '../../assets/less/define.less';
	.nav{height: 50px; background: #fff;position: fixed;top: 0;left: 0;width: 100%;border-bottom: 1px solid #efefef;
		ul{display: flex;height: 46px;line-height: 46px;
			li{flex:1;text-align: center;.font-dpr(14);
				a{color: #333;display: block;}
				&.active{
					a{color: #2c92e7;}
				}
			}
		}
		.moving{height: 3px;background: #318fe7;transition: all .4s ease 0s;}
	}
</style>