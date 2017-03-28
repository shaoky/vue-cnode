<template>
	<div class="container">
		<mt-header fixed :title="title">
			<mt-button icon="back" @click="history" slot="left" v-if="goBack"></mt-button>
			<mt-button icon="more" slot="right" @click="openMenu"></mt-button>
		</mt-header>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
		}
	}
}
</script>
