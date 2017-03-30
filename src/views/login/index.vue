<template>
    <div class="login-container">
    	<v-header title="登录"></v-header>
        <div class="content">
        	<input type="text" name="" placeholder="Access Token" v-model="token">
        	<div class="submit">
        		<mt-button type="primary" size="large" style="font-size:16px;" @click="submit">登录</mt-button>
        		<mt-button type="primary" size="large" style="font-size:16px;" @click="testSubmit">测试账号</mt-button>
        	</div>
        	<div class="note">注：作者账号，请勿随意操作，仅供浏览</div>
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
		submit () {
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
		},
		testSubmit () {
			this.token = '38ffc91e-2ce1-4a39-8fff-f9f757bf212f'
			this.submit()
		}
	}
}
</script>
<style lang="less">
	@import '../../assets/less/define.less';
	.login-container{background: #fff;margin-top: 40px;
		.content{padding: 50px 15px;
			input{width: 100%;border:none;border-bottom: 1px solid #ccc;padding: 12px 0;font-size: 14px;margin-bottom: 15px;}
			.submit{margin-top: @rem*40;display: flex;
				button{margin: 0 @rem*20;}
			}
			.note{margin-top: @rem*50;}
		}
		.mint-button--primary{background: #3090e6;}
	}
</style>