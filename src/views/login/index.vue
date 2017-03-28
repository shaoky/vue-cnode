<template>
    <div class="login-container">
    	<v-header title="登录" :go-back="false"></v-header>
        <div class="content">
        	<input type="text" name="" placeholder="Access Token" v-model="token">
        	<mt-button type="primary" size="large" style="font-size:16px;" @click="submit">登录</mt-button>
        </div>
    </div>
</template>

<script>
import $ from 'webpack-zepto'

export default {
	data () {
		return {
			token: null
		}
	},
	methods: {
		submit: function () {
			$.ajax({
				type: 'POST',
				url: 'https://cnodejs.org/api/v1/accesstoken',
				data: {
					accesstoken: this.token
				},
				dataType: 'json',
				success: (res) => {
					let user = {
						loginname: res.loginname,
						avatar_url: res.avatar_url,
						userId: res.id,
						token: this.token
					}
					this.$store.dispatch('setUserInfo', user)
					this.$router.go(-1)
				},
				error: (res) => {
					let error = JSON.parse(res.responseText)
					this.$toast(error.error_msg)
				}
			})
		}
	}
}
</script>
<style lang="less">
	@import '../../assets/less/define.less';
	.login-container{background: #fff;margin-top: 40px;
		.content{padding: 50px 15px;
			input{width: 100%;border:none;border-bottom: 1px solid #ccc;padding: 12px 0;font-size: 14px;margin-bottom: 15px;}
		}
	}
</style>