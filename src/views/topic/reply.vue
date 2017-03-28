<template>
	<div class="reply-container">
		<div class="reply-box" v-if="userInfo.userId">
			<textarea rows="8" placeholder="回复" v-model="submitData.content"></textarea>
			<mt-button type="primary" size="large" style="font-size:16px;" @click="submit">确定</mt-button>
		</div>
	</div>
	
</template>

<script>
import $ from 'webpack-zepto'
import { mapGetters } from 'vuex'

export default {
	data () {
		return {
			submitData: {
				replyId: null,
				accesstoken: null,
				content: null
			}
		}
	},
	props: ['topicId'],
	computed: {
		...mapGetters({
			userInfo: 'getUserInfo'
		})
	},
	methods: {
		submit () {
			if (!this.submitData.content) {
				this.$toast('请输入回复的内容')
			} else {
				this.submitData.accesstoken = this.userInfo.token
				$.ajax({
					type: 'POST',
					url: `https://cnodejs.org/api/v1/topic/${this.topicId}/replies`,
					data: this.submitData,
					dataType: 'json',
					success: (res) => {
						this.content = ''
						this.$emit('callback')
					}
				})
			}
		}
	}
}
</script>
