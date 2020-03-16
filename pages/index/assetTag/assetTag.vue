<template>
	<view class="ztbjs">
		<view class="dbszp">
			<view class="title2">
				<view class="zt">勘察工单</view>
				<view class="next" @click="tj">新增</view>
			</view>
			<view class="tubBg"><wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" classxz="wuc-tab-item"></wuc-tab></view>
		</view>
		<view >
			<!-- 	<image src="../../../static/icon_search@2x.png" class="search"></image>
			<input class="uni-input" v-model="search" placeholder="请输入关键字" />
			<image class="scan" src="../../../static/icon_code@2x.png" @click="scan"></image> -->
			<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" ztop="238rpx" @init="mescrollInit">
				<view class="Listall">
					<view v-for="item in dataList" :key="item.id" class="listdg" @click="gdid(item)">
						<view class="bthz">
							<view class="tbmz">
								<image :src="item.srclj" class="tb"></image>
								<view class="sx">
									<text style="font-size: 32rpx;">{{ item.clientName || '' }}</text>
									<text class="times">{{ item.workOrderNo || '' }}</text>
								</view>
							</view>
							<text class="times">{{ item.createTime || '' }}</text>
						</view>
						<view class="lbjytb">
							<view class="szlb">
								<view v-for="(item2, index) in items2" :key="index">
									<view class="btnr">
										<text style="color: #999999;">{{ item2.mz }}：</text>
										<view class="hhwz" :style="{ width: item2.mz == '客户地址' ? '220px' : '190px' }">{{ item[item2.zdm] || '' }}</view>
									</view>
								</view>
								<text class="ckxq" @click.stop="ccbjxqa(item)">查看客户信息</text>
							</view>
							<image src="/static/icon/right.png"></image>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		
		<!-- <navigation :anArray="anArray"></navigation> -->
	</view>
</template>

<script>

import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { anArray,items2,upOption } from './data.js';
import WucTab from '@/components/wuc-tab.vue';
import '../common.scss';
var fly = require('flyio');
export default {
	components: {
		WucTab,
	
		MescrollUni
	},
	computed: {
		...mapState(['ip', 'id', 'flag'])
	},
	data() {
		return {
			anArray: anArray,
			items2:items2,
			search: '',
			TabCur: 0,
			tabList: [
				{
					name: '待办'
				},
				{
					name: '已办'
				}
			],
			downOption: {},
			upOption:upOption,
			// items: [],
			dataList: [],
			page: 1
		};
	},
	mounted() {
		console.log(anArray);
		this.$EvenBus.$on('qzsx', () => {
			this.mescroll.resetUpScroll();
			this.TabCur = 0;
		});
		this.TabCur = this.flag;
	},
	onShow() {
		// this.mescroll.resetUpScroll();
	},
	methods: {
		//查看详情
		ccbjxqa(val) {
			this.ccbjxq(val);

			uni.navigateTo({
				url: '/pages/index/xz'
			});
		},

		mescrollInit(mescroll) {
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},

		//添加

		tj() {
			this.ccbjxq('添加');
			uni.navigateTo({
				url: '/pages/index/xz'
			});
		},
		downCallback(mescroll) {
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},
		upCallback(mescroll) {
			let pageNum = mescroll.num; // 页码, 默认从1开始
			let pageSize = mescroll.size; // 页长, 默认每页10条

			const _this = this;

			uni.request({
				url: this.ip + '/info-surveys',
				data: {
					limit: 7,
					page: mescroll.num,
					flag: _this.TabCur,
					userId: _this.id
				},
				success: data => {
					// 接口返回的当前页数据列表 (数组)
					console.log(data);

					let curPageData = data.data.content.records;
					data.data.content.records.map(item => {});

					curPageData.forEach(item => {
						switch (item.intention) {
							case '0':
								item.srclj = '/static/ql.png';
								break;
							case '1':
								item.srclj = '/static/yb.png';
								break;
							case '2':
								item.srclj = '/static/lbbttp.png';
								break;
							default:
								item.srclj = '/static/lbbttp.png';
								break;
						}
					});
					console.log(curPageData);
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = data.pages;
					// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
					let totalSize = data.total;
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = data.xxx;

					//设置列表数据
					if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
					this.dataList = this.dataList.concat(curPageData); //追加新数据

					// 成功隐藏下拉加载状态
					//方法一(推荐): 后台接口有返回列表的总页数 totalPage
					mescroll.endByPage(curPageData.length, totalPage);

					this.$nextTick(() => {
						mescroll.endSuccess(curPageData.length);
					});
				},
				fail: () => {
					// 失败隐藏下拉加载状态
					mescroll.endErr();
				}
			});
		},
		...mapMutations(['fzid', 'xgflag', 'gdid', 'ccbjxq']),

		tabChange(index) {
			this.TabCur = index;
			this.xgflag(index);
			console.log(index);
			this.mescroll.triggerDownScroll();
			// this.listRequest();
		}
	}
};
</script>

<style scoped lang="scss">
.uni-page-body {
	background-color: #f7f8fa;
}

@mixin flexa($direction: row, $justcontent: flex-start, $align: center) {
	display: flex;
	flex-direction: $direction;
	justify-content: $justcontent;
	align-items: $align;
}

.lbjytb {
	@include flexa(row, space-between, center);
	image {
		height: 48rpx;
		width: 48rpx;
	}
	line-height: 26px;
}
$xbkys: #f0f0f0;
.Listall {
	height: 100%;
	.bthz {
		@include flexa(row, space-between);
		border-bottom: solid 1px $xbkys;
		width: 100%;
		.times {
			font-size: 24rpx;
			color: #999999;
		}
		.tbmz {
			@include flexa(row, space-between, flex-start);
		}
		.sx {
			@include flexa(column, flex-start, flex-start);
			margin-left: 20rpx;
			width: 310rpx;
			font-weight: 600;
		}
	}
	.listdg {
		background: white;
		padding: 28rpx;
		margin: 20rpx;
	}
	.tb {
		height: 38rpx;
		width: 38rpx;
		position: relative;
		top: 2px;
	}

	.szlb {
		@include flexa(column, flex-start, flex-start);
		// padding: 15px;
		margin-top: 10px;
		font-size: 32rpx;
		.ckxq {
			font-size: 12px;
			color: #058489;
		}
		.btnr {
			@include flexa(row, flex-start, flex-start);
			.hhwz {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 380rpx;
			}
		}
	}
}

.loadingText {
	line-height: 30px;
	text-align: center;
	font-size: 12px;
	color: #999;
}

.uni-input {
	width: 280px;
	height: 30px;
	border: 1px solid #808080;
	display: inline-block;
	font-size: 14px;
	border-radius: 30px;
	margin-top: 10px;
	margin-left: 12px;
	text-indent: 1em;
}

.search {
	width: 20px;
	height: 20px;
	margin-bottom: 5px;
	margin-left: 10px;
}

.tb {
	width: 18px;
	height: 18px;
}

.scan {
	width: 20px;
	height: 20px;
	margin-left: 10px;
	margin-bottom: 6px;
}
</style>
