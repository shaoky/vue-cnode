<template>
	<footer class="footer-container">
		<ul>
			<li v-for="item in list">
				<router-link :to="item.path" v-if="$route.path == item.path" class="active">
					<i class="iconfont" :class="item.iconActive"></i>
					<span>{{item.title}}</span>
				</router-link>
				<router-link :to="item.path" v-if="$route.path != item.path">
					<i class="iconfont" :class="item.icon"></i>
					<span>{{item.title}}</span>
				</router-link>
			</li>
		</ul>
	</footer>
</template>

<script>
export default {
	data () {
		return {
			list: [
				{
					title: '首页',
					path: '/',
					icon: 'icon-shouye-xianxing',
					iconActive: 'icon-shouye'
				},
				// {
				// 	title: '发表',
				// 	path: '/1',
				// 	icon: 'icon-bianjishuru-xianxing',
				// 	iconActive: 'icon-bianjishuru'
				// },
				// {
				// 	title: '消息',
				// 	path: '/1',
				// 	icon: 'icon-xin-xianxing',
				// 	iconActive: 'icon-xin'
				// },
				{
					title: '我的',
					path: '/home',
					icon: 'icon-yonghu-xianxing',
					iconActive: 'icon-yonghu'
				}
			]
		}
	}
}
</script>
<style lang="less">
	.footer-container{position: fixed;height: 50px;z-index: 99;bottom: 0;left: 0;width: 100%; background: #f7f7f7;border-top: 1px solid #c5c5c5;
		ul{display: flex;padding-top: 3px;
			li{flex: 1; text-align: center;
				a{color: #333;display: block;
					i{display: block;line-height: 25px;
						&.icon-shouyeshouye{font-size: 28px;}
						&.icon-fabiao{font-size: 16px;}
						&.icon-icon066{font-size: 22px;}
						&.icon-wode1{font-size: 20px;}
					}
					span{}
				}
				.active{color: #369bf7;}
			}
		}
	}
</style>