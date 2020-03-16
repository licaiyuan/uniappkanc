import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
// const EvenBus=new Vue()
const state = {
	ip: "http://ops.xmrtc.com/api",
	// ip: "http://192.168.1.162:9898",
	id: '',
	flag: 0,
	tpsz: [],
	tpsz2: [],
	gdid: '',
	bjxqitem: {},
	chooseItem: '工单',
	iscomponent:'assetTag',//选择的组件

	// xmmz:''
}
const mutations = {
	//存储选择的tab
	chooseUrl(state, val) {
		console.log(val)
		let{name,zd}=val
		state.chooseItem = name
		state.iscomponent = zd
	},
	//存储编辑的详情
	ccbjxq(state, val) {
		// console.log(val)
		state.gdid = val.id

		val.flag ? state.flag = val.flag : ''

		state.bjxqitem = val

	},
	//存储id
	fzid(state, val) {
		// console.log(val)
		state.id = val.id
		uni.navigateTo({
			url: '../zymlb/zymlb'
		});
	},
	//存儲工單Id
	gdid(state, val) {
		state.gdid = val.id
		state.xmmz = val.clientName
		state.flag = val.flag
		uni.navigateTo({
			url: '/pages/index/detail/detail'
		});
	},
	//修改flag
	xgflag(state, val) {
		state.flag = val
	},
	//图片
	tpjy(state, val) {
		console.log(val)
		// val
		state.tpsz = val.latestPhoto.map(item => {
			return item = state.ip + item
		})
		state.tpsz2 = val.remotePhoto.map(item => {
			return item = state.ip + item
		})
	},
	//添加
	addimage(state, val) {

		console.log(val)
		val.type == '1' ? state.tpsz.push(state.ip + val.content) : state.tpsz2.push(state.ip + val.content)
		console.log(state.tpsz)
		console.log(state.tpsz2)
		// state.tpsz.push(state.ip+val)
	}

}
export default new Vuex.Store({
	state,
	mutations

})
