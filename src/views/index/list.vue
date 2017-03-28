<template>
	<div>
		<v-tabs></v-tabs>
		<div class="index-container">
			<!-- <v-header title="技术社区" :go-back="false"></v-header> -->
			<div class="list-box" :style="{ height: GetHeight + 'px' }">
				<ul class="page-infinite-list list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50">
					<li v-for="item in topics" class="page-infinite-listitem">
						<router-link :to="{name:'topic',params:{id:item.id}}">
							<div class="img">
								<img :src="item.author.avatar_url">
							</div>
							<div class="content">
								<div class="title">
									<i class="tag" :class="getTabInfo(item.tab, item.good, item.top, true)">
										{{getTabInfo(item.tab, item.good, item.top, false)}}
									</i>
									<h2>{{item.title}}</h2>
								</div>
								<div class="author">
									<span class="name">{{item.author.loginname}}</span>
									<span class="time">{{item.last_reply_at | getLastTimeStr(true)}}</span>
								</div>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<v-footer>1</v-footer>
	</div>
</template>

<script>
import $ from 'webpack-zepto'
import utils from '../../libs/utils'
import { Indicator, InfiniteScroll } from 'mint-ui'
import vTabs from './tabs'

export default {
	data () {
		return {
			topics: [],
			searchKey: {
				page: 1,
				limit: 20,
				tab: 'all',
				mdrender: true
			},
			list: [],
			GetHeight: null,
			loading: false,
			goback: 1
		}
	},
	filters: {
		getLastTimeStr (time, isFromNow) {
			return utils.getLastTimeStr(time, isFromNow)
		}
	},
	mounted () {
		// 容器高度
		this.refresh()
		window.addEventListener('resize', this.refresh)
		this.movingWidth = 500
		// 获取新闻类别
		if (this.$route.query && this.$route.query.tab) {
			this.searchKey.tab = this.$route.query.tab
		}
		// 如果从详情返回并且之前存有对应的查询条件和参数
		// 则直接渲染之前的数据
		if (window.window.sessionStorage.searchKey && window.window.sessionStorage.tab === this.searchKey.tab) {
			this.topics = JSON.parse(window.window.sessionStorage.topics)
			this.searchKey = JSON.parse(window.window.sessionStorage.searchKey)
			this.$nextTick(() => $('.list-box').scrollTop(window.window.sessionStorage.scrollTop))
		}/* else {
			this.getTopics()
		} */
		for (let i = 1; i <= 20; i++) {
			this.list.push(i)
		}
	},
	beforeRouteLeave (to, from, next) {
		// 如果跳转到详情页面，则记录关键数据
		// 方便从详情页面返回到该页面的时候继续加载之前位置的数据
		if (to.name === 'topic') {
			// 当前滚动条位置
			window.window.sessionStorage.scrollTop = $('.list-box').scrollTop()
			// 当前页面主题数据
			window.window.sessionStorage.topics = JSON.stringify(this.topics)
			// 查询参数
			window.window.sessionStorage.searchKey = JSON.stringify(this.searchKey)
			// 当前tab
			window.window.sessionStorage.tab = from.query.tab || 'all'
		}
		next()
	},
	methods: {
		getTopics () {
			Indicator.open()
			let params = $.param(this.searchKey)
			$.get('https://cnodejs.org/api/v1/topics?' + params, (res) => {
				this.topics = res.data
				this.loading = false
				Indicator.close()
			})
		},
		loadMore () {
			this.loading = true
			this.searchKey.limit += 20
			this.getTopics()
		},
		getTabInfo (tab, good, top, isClass) {
			return utils.getTabInfo(tab, good, top, isClass)
		},
		fetchData () {
			$('.list-box').scrollTop(0)
			this.searchKey.tab = this.$route.query.tab
			this.searchKey.limit = 10
			this.topics = []
			this.getTopics()
		},
		refresh () {
			this.GetHeight = document.body.clientHeight - 44 - 45
		}
	},
	watch: {
		'$route': 'fetchData'
	},
	components: {
		InfiniteScroll,
		vTabs
	}
}
</script>
<style lang="less">
	@import '../../assets/less/define.less';
	.index-container{margin-top: 50px;
		.list-box{height: 450px;overflow: scroll;margin-top: -1px;-webkit-overflow-scrolling: touch;
			.list{margin-top: @rem*20;padding: 0 @rem*20;min-height: 500px;margin-bottom: 50px;
				li{background: #fff;border-radius: 5px;box-shadow: 1px 1px 1px 1px #ccc;margin-bottom: @rem*20;
					a{display: flex;
						.img{width: @rem*130;height: @rem*130;margin: @rem*20;text-align: center;
							img{width: 100%;height: 100%;display: block;}
						}
						.content{flex: 1;margin: @rem*20;position: relative;
							.title{line-height: 1.4;.font-dpr(14);color: #333;position: relative;
								h2{text-indent: 40px;height: @rem*105;overflow:hidden;}
							}
							.author{position: absolute;bottom: -2px;display: inline-flex;width: 100%;color: #989898;
								.name{flex: 1;}
								.time{text-align: right;}
							}
						}
					}
				}
			}
		}
	}
</style>