let anArray = [{
		name: '工单',
		wxzimg: '/static/dbTab/gdwxz.png',
		yxzimg: '/static/dbTab/gdyxz.png',
		path: './assetTag',
		zd:'assetTag'
	},
	{
		name: '经验',
		wxzimg: '/static/dbTab/jywxz.png',
		yxzimg: '/static/dbTab/jyyxz.png',
		path: './assetTag',
		zd:'jy'
	},
	// {
	// 	name: '交流',
	// 	wxzimg: '/static/dbTab/jlwxz.png',
	// 	yxzimg: '/static/dbTab/jlyxz.png',
	// 	path: './assetTag',
	// 	zd:''
	// },
	// {
	// 	name: '我的',
	// 	wxzimg: '/static/dbTab/wdwxz.png',
	// 	yxzimg: '/static/dbTab/wdyxz.png',
	// 	path: './assetTag',
	// 	zd:''
	// }
]
let items2 = [{
		zdm: 'clientAddress',
		mz: '客户地址'
	},
	{
		zdm: 'clientLinkman',
		mz: '客户联系人'
	},
	{
		zdm: 'clientLink',
		mz: '客户联系电话'
	},
	{
		zdm: 'surveyPerson',
		mz: '勘察人员'
	}
]
let upOption = {
	use: true, // 是否启用上拉加载; 默认true
	auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
	page: {
		num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
		size: 7 // 每页数据的数量,默认10
	},
	noMoreSize: 0, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
	empty: {
		tip: '暂无相关数据'
	},
	textNoMore: '无更多数据'
}
export {
	anArray,
	items2,
	upOption
}
