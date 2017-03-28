const state = {
	userInfo: JSON.parse(window.localStorage.getItem('user')) || {}
}

const getters = {
	getUserInfo (state) {
		return state.userInfo
	}
}

const actions = {
	setUserInfo ({ commit }, user) {
		commit('setUserInfo', user)
	},
	delUserInfo ({ commit }) {
		commit('delUserInfo')
	}
}

const mutations = {
	setUserInfo (state, user) {
		state.userInfo = user
		window.localStorage.setItem('user', JSON.stringify(user))
	},
	delUserInfo (state, userInfo) {
		state.userInfo = ''
		window.localStorage.removeItem('user')
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
