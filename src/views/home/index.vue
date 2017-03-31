<template>
	<div class="container">
		<v-header title="个人中心" :goBack="false"></v-header>
		<div class="home-container" v-if="userVisible">
			<!-- 已登录 -->
			<div class="home-user" v-if="userInfo.loginname">
				<router-link :to="{name:'user',params:{loginname:userInfo.loginname}}">
					<div class="home-pic">
						<img :src="userInfo.avatar_url">
					</div>
					<div class="home-title">
						<span class="name">{{userInfo.loginname}}</span>
						<span class="time">{{user.create_at | getReplyTimeStr(false)}}</span>
					</div>
					<div class="home-arrow">
						<i class="iconfont icon-arrow"></i>
					</div>
				</router-link>	
			</div>
			<!-- 未登录 -->
			<div class="home-user" v-if="!userInfo.loginname">
				<router-link to="/login">
					<div class="home-pic">
						<img src="../../assets/images/home-noLogin.png">
					</div>
					<div class="home-title">
						<span class="name">立即登录</span>
						<span class="time1">登录后可进行评论，发帖</span>
					</div>
					<div class="home-arrow">
						<i class="iconfont icon-arrow"></i>
					</div>
				</router-link>	
			</div>
			<div class="home-info">
				<ul>
					<li>
						<router-link :to="{name:'user',params:{loginname:userInfo.loginname}}">
							<span class="num orange">
								<i>{{ userInfo.loginname ? user.recent_replies.length : 0 }}</i>条
							</span>
							<span class="title">评论</span>
						</router-link>	
					</li>
					<li>
						<router-link :to="{name:'user',params:{loginname:userInfo.loginname}}">
							<span class="num red">
								<i>{{ userInfo.loginname ? user.recent_topics.length : 0 }}</i>个
							</span>
							<span class="title">发布</span>
						</router-link>
					</li>
					<li>
						<router-link to="">
							<span class="num green">
								<i>{{ userInfo.loginname ? user.score : 0 }}</i>分
							</span>
							<span class="title">积分</span>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="bar-container">
				<ul>
					<li>
						<router-link to="1">
							<i class="icon iconfont icon-bianjishuru"></i>
							<div class="title">发表主题</div>
							<i class="iconfont icon-arrow"></i>
						</router-link>
					</li>
					<li>
						<router-link to="/home/message">
							<i class="icon iconfont icon-xin"></i>
							<div class="title">我的消息</div>
							<i class="iconfont icon-arrow"></i>
						</router-link>
					</li>
					<li>
						<router-link to="/home/collect">
							<i class="icon iconfont icon-shoucang"></i>
							<div class="title">我的收藏</div>
							<i class="iconfont icon-arrow"></i>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="bar-container">
				<ul>
					<li>
						<router-link to="/about">
							<i class="icon iconfont icon-xinxi-yuankuang"></i>
							<div class="title">关于</div>
							<i class="iconfont icon-arrow"></i>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="home-out" @click="outUser" v-if="userInfo.loginname">退出登录</div>
			<div style="height: 50px;"></div>
		</div>
		<v-footer></v-footer>
	</div>	
</template>

<script>
import $ from 'webpack-zepto'
import utils from '../../libs/utils'
import { Indicator, MessageBox } from 'mint-ui'
import { mapGetters } from 'vuex'

export default {
	data () {
		return {
			user: {
				recent_replies: {},
				recent_topics: {}
			},
			selected: '1',
			loginname: null,
			curUserVisible: false,
			userVisible: null
		}
	},
	computed: {
		...mapGetters({
			userInfo: 'getUserInfo'
		})
	},
	filters: {
		getReplyTimeStr (time, isFromNow) {
			return utils.getLastTimeStr(time, isFromNow).substr(0, 10)
		}
	},
	mounted () {
		this.userInfo.loginname ? this.getUser() : this.userVisible = true
	},
	methods: {
		getUser () {
			Indicator.open()
			// 获取url传的tab参数
			this.loginname = this.userInfo.loginname
			$.get('https://cnodejs.org/api/v1/user/' + this.loginname, (res) => {
				this.user = res.data
				this.userVisible = true
				Indicator.close()
			})
		},
		outUser () {
			MessageBox.confirm('确定退出登录吗?').then(action => {
				this.$store.dispatch('delUserInfo')
				this.$router.push({
					path: '/'
				})
			})
		},
		curUser () {
			this.loginname === this.userInfo.loginname ? this.curUserVisible = true : this.curUserVisible = false
		}
	}
}
</script>

<style lang="less">
	@import '../../assets/less/define.less';
	.home-container{position: relative;background: #f3f3f3;
		.home-user{padding: @rem*40 @rem*30; background: #3090e6;
			a{display: flex; align-items: center; color: #fff;
				.home-pic{width: 70px;
					img{border-radius: 50%;}
				}
				.home-title{flex: 1; margin-left: @rem*20; .font-dpr(16); line-height: 1.5;
					.name{display: block;}
					.time1{.font-dpr(12)}
				}
				.home-arrow{}
			}	
		}
		.home-info{background: #fff;border-bottom: 1px solid #ededed;
			ul{display: flex; align-items: center; height: @rem*140;
				li{flex: 1; display: inline-flex; align-items: center; width: 0; height: 100%; text-align: center;border-right: 1px solid #ededed;
					a{width: 100%;
						.num{display: block;
							i{margin-right: @rem*5; .font-dpr(18)}
						}
						.title{display: block; margin-top: @rem*5;.font-dpr(14); color: #666;}
					}
					
					.orange{color: #e19f17;}
					.red{color: #f7593e;}
					.green{color: #65c200;}
				}
			}
		}
		.bar-container{margin-top: @rem*20;
			.icon-bianjishuru{color: #f7593e;}
			.icon-xin{color: #369bf7;}
			.icon-xinxi-yuankuang{color: #888;}
			.icon-shoucang{color: #dbd350;}
		}
		.home-out{margin-top: @rem*20; color: #f00;background: #fff;height: @rem*80;line-height: @rem*80;text-align: center;.font-dpr(16);}
	}
</style>