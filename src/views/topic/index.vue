<template>
	<div class="container" style="bottom: 0;">
		<v-header title="主题"></v-header>
		<div class="topic-container" v-if="topic.title">
			<div class="title">
				<i class="tag" :class="getTabInfo(topic.tab, topic.good, topic.top, true)">
					{{getTabInfo(topic.tab, topic.good, topic.top, false)}}
				</i>
				<h2>{{topic.title}}</h2>
			</div>
			<div class="info">
				<div class="img">
					<router-link :to="{name:'user',params:{loginname:topic.author.loginname}}">
						<img :src="topic.author.avatar_url">
					</router-link>
				</div>
				<div class="author">
					{{topic.author.loginname}}<br/>
					发布于：{{getLastTimeStr}}
				</div>
				<span class="number">{{topic.visit_count}} 次浏览</span>
			</div>
			<div class="content" v-html="topic.content"></div>
			<div class="reply">
				新鲜评论<i>({{topic.reply_count}})</i>
			</div>
			<div class="reply-list">
				<ul>
					<li v-for="(item ,index) in topic.replies">
						<router-link :to="{name:'user',params:{loginname:item.author.loginname}}">
							<img :src="item.author.avatar_url"/>
						</router-link>
						<div class="reply-content">
							<div class="reply-info">
								<div class="reply-author">{{item.author.loginname}}</div>
								<div class="reply-time">{{item.create_at | getReplyTimeStr(true)}}</div>
							</div>
							<div class="reply-text" v-html="item.content"></div>
						</div>
						<div class="reply-floor">{{index + 1}}楼</div>
					</li>
				</ul>
			</div>
			<reply v-if="userInfo.userId" :topic-id="topicId" @callback="getData"></reply>
		</div>
	</div>	
</template>

<script>
import $ from 'webpack-zepto'
import utils from '../../libs/utils'
import { Indicator } from 'mint-ui'
import { mapGetters } from 'vuex'
import reply from './reply'

export default {
	data () {
		return {
			topic: {
				author: {},
				replies: {}
			},
			topicId: null,
			a: null
		}
	},
	filters: {
		getReplyTimeStr (time, isFromNow) {
			return utils.getLastTimeStr(time, isFromNow)
		}
	},
	computed: {
		getLastTimeStr: function () {
			return utils.getLastTimeStr(this.topic.create_at, true)
		},
		...mapGetters({
			userInfo: 'getUserInfo'
		})
	},
	mounted () {
		this.getData()
	},
	methods: {
		getTabInfo (tab, good, top, isClass) {
			return utils.getTabInfo(tab, good, top, isClass)
		},
		getData () {
			Indicator.open()
			// 获取url传的tab参数
			this.topicId = this.$route.params.id
			// 加载主题数据
			$.get('https://cnodejs.org/api/v1/topic/' + this.topicId, (res) => {
				this.topic = res.data
				Indicator.close()
			})
		}
	},
	components: {
		reply
	}
}
</script>
<style lang="less">
	@import '../../assets/less/define.less';
	.topic-container{background: #fff;padding-top: @rem*20;
		.title{.font-dpr(18);position: relative;margin: 0 @rem*20;
			.tag{padding: 3px 6px;.font-dpr(12);}
			h2{text-indent: 43px;}
		}
		.info{margin-top: @rem*25;display: flex;padding: 0 @rem*20;
			.img{width: @rem*70;height: @rem*70;display: block;
				img{border-radius: 50%;width: 100%;height: 100%;}
			}
			.author{flex: 1;color: #333;margin-left: @rem*20;line-height: 1.6;}
			.number{color: #989898; align-self:flex-end;margin-bottom: @rem*10;}
		}
		.content{margin: @rem*40 0;padding: 0 @rem*20;
			line-height: 2;.font-dpr(16);
		}
		.reply{padding: @rem*15;border-bottom: 1px solid #d4d4d4;.font-dpr(14);
			i{color: #42b983;margin-left: 2px;}
		}
		.reply-box{padding: @rem*20;
			textarea{resize: none;border:1px solid #d5dbdb;width: 100%;padding: 10px;}
			button{margin-top: 15px;margin-bottom: 5px;}
		}
	}
</style>