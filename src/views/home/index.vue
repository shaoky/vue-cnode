<template>
	<div>
		<v-header title="用户信息"></v-header>
		<div class="home-container">
			<div class="home-user">
				<div class="home-pic">
					<img :src="userInfo.avatar_url">
				</div>
				<div class="home-title">{{userInfo.loginname}}</div>
			</div>
			{{userInfo}}
		</div>
		<v-footer></v-footer>
	</div>	
</template>

<script>
import $ from 'webpack-zepto'
import utils from '../../libs/utils'
import { Indicator, Navbar, TabItem } from 'mint-ui'
import { mapGetters } from 'vuex'

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
		// this.getUser()
		// this.curUser()
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
	}
}
</script>

<style lang="less">
	@import '../../assets/less/define.less';
	.home-container{position: relative; margin-top: 40px; background: #f3f3f3;
		.home-user{background: #3090e6;padding: @rem*40 @rem*30;display: flex;
			.home-pic{width: 100px;
				img{border-radius: 50%;}
			}
			.home-title{color: #fff;margin-left: @rem*20;.font-dpr(16);}
		}
	}
</style>