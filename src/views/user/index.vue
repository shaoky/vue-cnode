<template>
	<div>
		<v-header title="用户信息"></v-header>
		<div class="user-container" v-if="user.loginname">
			<div class="user-out" @click="outUser" v-if="curUserVisible">安全退出</div>
			<img :src="user.avatar_url" class="picture">
			<span class="user-name">{{user.loginname}}</span>
			<div class="user-info">
				<span class="time">注册时间：{{user.create_at | getReplyTimeStr(false)}}</span>
				<span class="score">积分：{{user.score}}</span>
			</div>
			<mt-navbar v-model="selected">
				<mt-tab-item id="1">评论</mt-tab-item>
				<mt-tab-item id="2">发布</mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<div class="reply-list">
						<ul>
							<li v-for="(item ,index) in user.recent_replies">
								<router-link :to="{name:'user',params:{loginname:item.author.loginname}}">
									<img :src="item.author.avatar_url"/>
								</router-link>
								<div class="reply-content">
									<div class="reply-info">
										<div class="reply-author">
											<router-link :to="{name:'topic',params:{id:item.id}}">
												{{item.title}}
											</router-link>	
										</div>
										<div class="reply-time">
											<div class="reply-time-left">{{item.author.loginname}}</div>
											<div class="reply-time-right">{{item.last_reply_at | getReplyTimeStr(true)}}</div>
										</div>	
									</div>
									<div class="reply-text" v-html="item.content"></div>
								</div>
							</li>
						</ul>
						<div class="list-null" v-if="!user.recent_replies.length">没有记录</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div class="reply-list">
						<ul>
							<li v-for="(item ,index) in user.recent_topics">
								<router-link :to="{name:'user',params:{loginname:item.author.loginname}}">
									<img :src="item.author.avatar_url"/>
								</router-link>
								<div class="reply-content">
									<div class="reply-info">
										<div class="reply-author">
											<router-link :to="{name:'topic',params:{id:item.id}}">
												{{item.title}}
											</router-link>	
										</div>
										<div class="reply-time">
											<div class="reply-time-left">{{item.author.loginname}}</div>
											<div class="reply-time-right">{{item.last_reply_at | getReplyTimeStr(true)}}</div>
										</div>	
									</div>
									<div class="reply-text" v-html="item.content"></div>
								</div>
							</li>
						</ul>
						<div class="list-null" v-if="!user.recent_topics.length">没有记录</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>	
</template>

<script>
import $ from 'webpack-zepto'
import utils from '../../libs/utils'
import { Indicator, Navbar, TabItem } from 'mint-ui'
import { mapGetters } from 'vuex'
import vHeader from '../../components/header/header'

export default {
	data () {
		return {
			user: {},
			selected: '1',
			loginname: null,
			curUserVisible: false
		}
	},
	computed: {
		...mapGetters({
			userInfo: 'getUserInfo'
		})
	},
	filters: {
		getReplyTimeStr (time, isFromNow) {
			return utils.getLastTimeStr(time, isFromNow)
		}
	},
	mounted () {
		this.getUser()
		this.curUser()
	},
	methods: {
		getUser () {
			Indicator.open()
			// 获取url传的tab参数
			this.loginname = this.$route.params.loginname
			$.get('https://cnodejs.org/api/v1/user/' + this.loginname, (res) => {
				this.user = res.data
				Indicator.close()
			})
		},
		outUser () {
			this.$store.dispatch('delUserInfo')
			this.$router.push({
				path: '/'
			})
		},
		curUser () {
			this.loginname === this.userInfo.loginname ? this.curUserVisible = true : this.curUserVisible = false
		}
	},
	watch: {
		'$route' (to, from) {
			this.getUser()
			this.curUser()
		}
	},
	components: {
		vHeader
	}
}
</script>

<style lang="less">
	@import '../../assets/less/define.less';
	.user-container{position: relative; margin-top: 50px; background: #f3f3f3;
		.user-out{position: absolute; right: 15px; top: 50px; .font-dpr(12);}
		.picture{display: block; width: 100px; height: 100px; margin: 0 auto; margin-top: @rem*30; border-radius: 50%;}
		.user-name{display: block; margin-top: @rem*10; text-align: center; .font-dpr(14);}
		.user-info{display: flex; padding: 0 @rem*30 @rem*30 @rem*30; margin-top: @rem*50; .font-dpr(14);
			.time{flex: 1;}
			.score{}
		}
		.mint-navbar{border-top: 2px solid #f1f1f1; border-bottom: 1px solid #f1f1f1;
			a{color: #333;}
			.mint-tab-item.is-selected{margin-bottom: 0;}
			.mint-tab-item-label{.font-dpr(14)}
			.mint-tab-item{padding: @rem*30 0;}
		}
		.mint-tab-container{background: #fff;}
		.reply-list{
			>ul{
				>li{padding-left: @rem*20; padding-right: @rem*20;}
			}
			.list-null{line-height: @rem*200; text-align: center; .font-dpr(14)}
		}
	}
</style>