<template>
		<!-- <div class="body-hide" v-if="showMenu" @click="openMenu"></div> -->
		<mt-header fixed :title="title">
			<mt-button icon="back" @click="history" slot="left" v-if="goBack"></mt-button>
			<!-- <mt-button icon="more" slot="right" @click="openMenu"></mt-button> -->
		</mt-header>
		<!-- <div class="sidebar" :class="{'show':showMenu}">
			<user-login @callback="openMenu"></user-login>
			<ul class="list">
				<li @click="openNav">
					<router-link :to="{'name':'list',query:{tab:'all'}}" class="icon-quanbu iconfont item">全部</router-link>
				</li>
				<li @click="openNav">
					<router-link :to="{'name':'list',query:{tab:'good'}}" class="icon-hao iconfont item">精华</router-link>
				</li>
				<li @click="openNav">
					<router-link :to="{'name':'list',query:{tab:'share'}}" class="icon-fenxiang iconfont item">分享</router-link>
				</li>
				<li @click="openNav">
					<router-link :to="{'name':'list',query:{tab:'ask'}}" class="icon-wenda iconfont item">问答</router-link>
				</li>
				<li @click="openNav">
					<router-link :to="{'name':'list',query:{tab:'job'}}" class="icon-zhaopin iconfont item">招聘</router-link>
				</li>
				<li @click="openNav" class="topline">
					<router-link :to="{'name':'about'}" class="icon-about iconfont item">关于</router-link>
				</li>
			</ul>
		</div> -->
</template>

<script>
import vMenu from './menu'
import userLogin from './user-login'

export default {
	data () {
		return {
			showMenu: null
		}
	},
	props: {
		title: {
			type: String,
			default: null
		},
		goBack: {
			type: Boolean,
			default: true
		}
	},
	methods: {
		history () {
			window.history.go(-1)
		},
		openMenu () {
			this.showMenu = !this.showMenu
		},
		openNav () {
			this.openMenu()
		}
	},
	components: {
		vMenu,
		userLogin
	}
}
</script>
<style lang="less">
	.mint-header{background: #3090e6;}
</style>