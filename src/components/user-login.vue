<template>
	<div class="userLogin-container">
		<!-- 未登录 -->
		<div class="user-login" @click="login" v-if="!userInfo.loginname">
			<i class="icon"></i>
			<div class="title">登录</div>
		</div>
		<!-- 已登录 -->
		<div class="user-login" @click="user" v-if="userInfo.loginname">
			<i class="pic"><img :src="userInfo.avatar_url"></i>
			<div class="title">{{userInfo.loginname}}</div>
		</div>
	</div>
	
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
		...mapGetters({
			userInfo: 'getUserInfo'
		})
	},
	methods: {
		login () {
			this.$router.push('/login')
			this.$emit('callback')
		},
		user () {
			this.$router.push({
				name: 'user',
				params: {
					loginname: this.userInfo.loginname
				}
			})
			this.$emit('callback')
		}
	}
}
</script>
