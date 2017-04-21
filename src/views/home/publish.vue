<template>
	<div class="container" style="bottom: 0;">
		<v-header title="发表主题"></v-header>
		<div class="collect-container" v-if="data.length">
			111
		</div>
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
			data: {}
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
		this.getData()
	},
	methods: {
		getData () {
			Indicator.open()
			$.get('https://cnodejs.org/api/v1/topic_collect/' + this.userInfo.loginname, (res) => {
				this.data = res.data
				this.userVisible = true
				Indicator.close()
			})
		},
		delCollect (index, id) {
			MessageBox.confirm('确定删除收藏吗?').then(action => {
				$.ajax({
					type: 'POST',
					url: 'https://cnodejs.org/api/v1/topic_collect/de_collect',
					data: {
						accesstoken: this.userInfo.token,
						topic_id: id
					},
					dataType: 'json',
					success: (res) => {
						this.data.splice(index, 1)
					},
					error: (res) => {
						let error = JSON.parse(res.responseText)
						this.$toast(error.error_msg)
					}
				})
			})
		}
	}
}
</script>

<style lang="less">
	@import '../../assets/less/define.less';
	.collect-container{
		.collect-edit{display: flex; align-items: center; height: @rem*80;padding: 0 @rem*20;
			.count{
				i{margin-right: @rem*5;}
			}
		}
		.collect-list{margin-top: 0;
			ul{
				li{padding: @rem*20 @rem*20;background: #fff;margin-bottom: @rem*20;box-shadow: 1px 1px 1px 1px #ccc;
					.collect-author{display: flex;align-items: center;
						>a{width: 25px;height: 25px;display: block;
							img{width: 100%;height: 100%;border-radius: 50%;}
						}
						.collect-name{margin-left: @rem*10;.font-dpr(14);flex: 1;
							a{color: #9fa1a0;}
						}
						.more{color: #9fa1a0;
							.icon-shanchu{font-size: 18px;}
						}
					}
					.collect-content{
						a{color: #333;
							.collect-title{.font-dpr(16);margin: @rem*15 0;clear: #232323;font-weight: 700;}
							.collect-text{height: 55px;overflow: hidden;line-height: 1.5;.font-dpr(12)}
						}
					}
					.collect-changes{margin: @rem*10 0; color: #9fa1a0;.font-dpr(12);
						span{margin: 0 @rem*2;
							a{color: #9fa1a0;}
							i{
								margin-right: @rem*5;
							}
							&:first-child{margin-left: 0;}
						}
					}
				}
			}
		}
	}
</style>