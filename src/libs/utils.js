'use strict'

// import _ from 'lodash'
/**
 *timeago.js 是一个非常简洁、轻量级、小于 2kb 的很简洁的Javascript库
 *用来将datetime时间转化成类似于*** 时间前的描述字符串，例如：“3小时前”。
 */
import Timeago from 'timeago.js'

/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
 */
const fmtDate = (date, fmt) => { // author: meizz
	var o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S': date.getMilliseconds() // 毫秒
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
		}
	}
	return fmt
}

/**
 * 调用Timeago库显示到现在的时间
 */
const MillisecondToDate = (time) => {
	let str = ''
	if (time !== null && time !== '') {
		let timeagoInstance = new Timeago()
		str = timeagoInstance.format(time, 'zh_CN')
	}
	return str
}

/**
 * 格式化日期或时间
 * @param {string} time 需要格式化的时间
 * @param {bool} friendly 是否是fromNow
 */
exports.getLastTimeStr = (time, friendly) => {
	if (friendly) {
		return MillisecondToDate(time)
	} else {
		return fmtDate(new Date(time), 'yyyy-MM-dd hh:mm')
	}
}

/**
 * 获取不同tab的信息
 * @param  {[type]}  tab     [tab分类]
 * @param  {[type]}  good    [是否是精华]
 * @param  {[type]}  top     [是否置顶]
 * @param  {Boolean} isClass [是否是样式]
 * @return {[type]}          [返回对应字符串]
 */
exports.getTabInfo = (tab, good, top, isClass) => {
	let str = ''
	let className = ''
	if (top) {
		str = '置顶'
		className = 'top'
	} else if (good) {
		str = '精华'
		className = 'good'
	} else {
		switch (tab) {
		case 'share':
			str = '分享'
			className = 'share'
			break
		case 'ask':
			str = '问答'
			className = 'ask'
			break
		case 'job':
			str = '招聘'
			className = 'job'
			break
		default:
			str = '暂无'
			className = 'default'
			break
		}
	}
	return isClass ? className : str
}
