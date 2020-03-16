<template>
	<view class="ztbjs">
		<!-- 	<view class="title">
			<image src="/static/icon/left.png" class="iconImg" @click="back"></image>
			<view class="zt">{{ xmmz }}</view>
			<view class="next" @click="wc" v-show="flag == 0">完成</view>
		</view> -->
		<view class="dbszp">
			<view class="title2">
				<image src="/static/icon/left.png" class="iconImg" @click="back"></image>
				<view class="zt">{{ xmmz }}</view>
				<view class="next" @click="wctc" v-show="flag == 0">完成</view>
			</view>
			<view class="tubBg"><wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" classxz="wuc-tab-item"></wuc-tab></view>
		</view>
		<view class="qbdsc" :style="{ marginTop: flag == 0 || flag == 1 ? '234rpx' : '140rpx' }">
			<view v-if="TabCur == '0'" v-for="(item, index) in items" :key="index">
				<takePhoto :title="item.title" :remark="item.remark" :gdid="gdid" :typeid="item.id" :ip="ip" :value="item.fileIds"></takePhoto>
			</view>
			<view v-if="TabCur == '1'" class="ztbf">
				<view v-for="(item, index3) of items2" :key="index3">
					<view class="btjmz">
						<image :src="item.btlj" style="height: 32rpx;width: 32rpx;"></image>
						<text>{{ item.btmz }}</text>
					</view>

					<view class="ztbsbf">
						<view v-for="(xlb, index1) in item.xdbf" :key="index1">
							<view class="lb" v-for="(item2, index2) in xlb.xdsjz" :key="index2" :style="{marginTop:index2==0?'10px':0}">
								<text :class="item2.prop != '' ? 'hs' : 'hs2'">{{ item2.name }}</text>

								<input class="uni-input" v-model="item2.input" :placeholder="item2.pd" v-if="item2.prop != '' && flag == 0" />
								<text v-else>{{ item2.input }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<Modal v-model="show" title="完成" text="请确认是否完成？完成后将转为已办,信息不能修改!" @event="event" />
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import WucTab from '@/components/wuc-tab.vue';
import takePhoto from './takePhoto.vue';
import '../common.scss';
import Modal from '@/components/x-modal/x-modal';
import { back } from '../common.js';
import { qdsj } from './data.js';
export default {
	onLoad() {},
	components: {
		takePhoto,
		WucTab,
		Modal
	},
	data() {
		return {
			show: false,
			items2: [],
			items: [],
			tabList: [
				{
					name: '拍照'
				},
				{
					name: '清单'
				}
			],
			TabCur: 0,
			status: ''
		};
	},
	computed: {
		...mapState(['ip', 'id', 'gdid', 'xmmz', 'flag'])
	},
	created() {},
	mounted() {
		this.items2 = qdsj;
		// console.log(qdsj)
		this.qqxqzp();
		this.qqqd();
	},
	methods: {
		wctc() {
			this.show = true;
		},
		//确认完成
		event(e) {
			console.log(e);
			let { from } = e;
			from == 'confirm' ? this.wc() : '';
		},
		//请求清单
		qqqd() {
			const _this = this;
			uni.request({
				url: this.ip + '/info-surveys/queryEquipment/' + this.gdid, //仅为示例，并非真实接口地址。
				data: {},

				success: res => {
					res.data.content.forEach(item4 => {
						item4.count = item4.count || '';
						_this.items2.forEach(item => {
							item.xdbf.forEach((item2, index) => {
								if (item2.xdsjz[0].type == item4.type) {
									let { count, model, remark, id } = item4;
									item2.xdsjz[0].id = id;
									item2.xdsjz[1].input = model;
									item2.xdsjz[2].input = count;
									item2.xdsjz[3].input = remark;
								}
							});
						});
					});
					// console.log(res.data.content);
					res.data.content.length > 0 ? (_this.status = 'bj') : '';
				}
			});
		},
		tabChange(index) {
			this.TabCur = index;

			// this.listRequest();
		},
		//完成
		wc() {
			const _this = this;
			uni.request({
				url: this.ip + '/info-surveys/' + this.gdid, //仅为示例，并非真实接口地址。
				data: {
					flag: 1
				},
				method: 'PUT',
				success: res => {
					console.log(res.data);
					_this.$EvenBus.$emit('qzsx');
					back();
				}
			});
		},
		back() {
			if (this.flag == 0) {
				let formdataarray = [];
				console.log(this.items2);

				this.items2.forEach(item => {
					item.xdbf.forEach((item2, index) => {
						let formdatajson = {};
						item2.xdsjz.forEach((item3, index3) => {
							// console.log(item3.type)
							//代码可能有点冗余踩坑过来写的见谅
							index3 == 0 ? (formdatajson.type = item3.type) && (item3.id ? (formdatajson.id = item3.id) : '') : (formdatajson[item3.prop] = item3.input);
						});

						formdataarray.push(formdatajson);
					});
				});
				console.log(formdataarray);

				let urlpj;
				let ff;
				if (this.status == 'bj') {
					urlpj = 'updateEquipment';
					ff = 'PUT';
				} else {
					urlpj = 'addEquipment';
					ff = 'POST';
				}

				uni.request({
					url: this.ip + '/info-surveys/' + urlpj, //仅为示例，并非真实接口地址。
					data: {
						surveyId: this.gdid,
						equipments: formdataarray
					},
					method: ff,
					success: res => {
						console.log(res.data);
						back();
					}
				});
			} else {
				back();
			}
		},
		//請求詳情照片
		qqxqzp() {
			const _this = this;
			uni.request({
				url: this.ip + '/info-surveys/queryImage/' + this.gdid, //仅为示例，并非真实接口地址。

				success: res => {
					console.log(res.data);
					let { content } = res.data;
					// let{code,content,message}=res.data

					_this.items = content;
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.tb {
	height: 44rpx;
	width: 44rpx;
}

.top {
	height: 44rpx;
	width: 44rpx;
	margin-left: 25rpx;
}
.qbdsc {
	margin-top: 158rpx;
}

.qbd {
	height: 100%;
	position: fixed;
	z-index: 300;
	top: 92px;
	overflow: auto;
	margin: 0 2%;
}

.ck {
	z-index: 200;
	// position: absolute;
	background: white;
	padding: 16px;
	border-radius: 15px;
	// top: 64px;
	margin: 0 auto;
	width: 656rpx;
	left: 14rpx;
	margin-top: 60rpx;
}

$bkys: #edeeef;

.xmzt {
	margin-top: 30rpx;
	@extend .ck;
	// top: 290px;
	padding-bottom: 100px;

	.xbk {
		padding: 14px;
		border-bottom: solid 1px $bkys;
		.reso {
			height: 58rpx;
			line-height: 58rpx;
			display: flex;
			align-items: center;
		}
		.resolve {
			font-size: 32rpx;
			margin-left: 20rpx;
		}

		.unresolve {
			font-size: 28rpx;
			color: #999999;
			margin-top: 20rpx;
		}

		.close {
			font-size: 30rpx;
			margin-left: 20rpx;
		}

		.far {
			font-size: 30rpx;
			margin-left: 20rpx;
		}

		.bqyz {
			.sign {
				width: 120px;
				font-size: 32rpx;
				margin-left: 20rpx;
			}
		}
	}
}

.yz {
	font-size: 10px;
	line-height: 20px;
	padding: 1px 15px;
	height: 20px;
	margin-left: 160rpx;
}

.head {
	height: 80rpx;
	line-height: 80rpx;
	font-size: 32rpx;
	display: flex;
	align-items: center;
}

.dglb {
	margin-left: 30rpx;
	font-size: 28rpx;
	padding: 10rpx;
}

.txt {
	font-size: 32rpx;
	margin-left: 10rpx;
}
.farPhoto {
	font-size: 32rpx;
	text-indent: 1em;
}
.php {
	height: 58rpx;
	line-height: 58rpx;
	display: flex;
	align-items: center;
}
.closePhoto {
	font-size: 32rpx;
	margin-left: 20rpx;
}
.signNumber {
	font-size: 28rpx;
	padding-top: 20rpx;
	color: #333333;
}
</style>
