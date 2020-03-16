<template>
	<view class="ztbjs">
		<!-- <view class="gddb"> -->

		<view class="title">
			<image src="/static/icon/left.png" class="iconImg" @click="back"></image>
			<view class="zt">{{ ymbt }}</view>
		</view>
		<view :class="flag == '0' || bjxqitem == '添加' ? 'ztbf' : 'ztbf2'">
			<view v-for="(item, index1) in items2" :key="index1">
				<view class="btjmz">
					<image :src="item.btlj"></image>
					<text>{{ item.btmz }}</text>
				</view>

				<view v-if="item.btmz == '代维意愿'" class="ztbsbf">
					<view class="lb" style="flex-direction: column;">
						<radio-group @change="radioChange" class="dxk">
							<label v-for="(dx, index3) in item.xdbf" :key="index3" class="dxkhz">
								<view><radio :value="dx.prop" :checked="form2.intention == dx.prop" :disabled="flag == 1&&bjxqitem != '添加'" class="formradio" /></view>
								<view>{{ dx.name }}</view>
							</label>
						</radio-group>
						<view class="srktext">
							<textarea v-model="form2.remark" placeholder="备注" v-if="flag == 0 || bjxqitem == '添加'" />
							<text v-else>{{ form2.remark }}</text>
						</view>
					</view>
				</view>
				<view v-else-if="item.btmz == '非招金额'" class="ztbsbf">
					<view class="lb">
						<view class="hs" style="width: 100%;">
							<view class="htjefmyh">
								<text>无需公开招标，仅需自主询价金额</text>

								<input class="htjefm" type="number" v-model="form2.money" v-if="flag == 0" />
								<text v-else>{{ form2.money }}</text>
								<text>万以内,</text>
								<text>自主询价是否需要报年预算及半年度预算？</text>
							</view>
							<view>
								<radio-group @change="radioChangesf" class="dxk">
									<label v-for="(dx, index4) in gthesf" :key="index4" class="dxkhz">
										<view><radio :value="dx.prop" :checked="form2.inform == dx.prop" :disabled="flag == 1&&bjxqitem != '添加'" class="formradio" /></view>
										<view>{{ dx.name }}</view>
									</label>
								</radio-group>
								<text>合同金额方面的补充说明：</text>
								<view class="srktext" style="margin-top: 20rpx;">
									<textarea v-model="form2.contractRemark" placeholder="其他方面补充说明" v-if="flag == 0 || bjxqitem == '添加'" />
									<text v-else>{{ form2.contractRemark }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="ztbsbf" v-else>
					<view
						class="lb"
						v-for="(xlb, index2) in item.xdbf"
						:key="index2"
						v-if="item.btmz != '代维意愿'"
						:style="{ alignItems: xlb['name'] == '客户地址：' ? 'flex-start' : 'center' }"
					>
						<text class="bt" v-if="item.btmz == '客户信息'">*</text>
						<text class="hs">{{ xlb.name }}</text>
						<view
							v-if="xlb.name == '客户地址：' && (flag == 0 || bjxqitem == '添加') "
							style="display: flex;
    width: 70%;justify-content: space-between;alignItems: flex-start;"
						>
							<textarea class="srktext2" v-model="form2[xlb.prop]" :placeholder="xlb.pd" auto-height="true" style="font-size: 32rpx;top:3px;" />

							<image src="/static/xz/sx.png" style="height: 32rpx;width: 32rpx;" @click="sxdz('sx')"></image>
						</view>
						<text v-if="flag == 1 && bjxqitem != '添加'" class="wbcc">{{ form2[xlb.prop] }}</text>
						<input
							class="uni-input"
							v-model="form2[xlb.prop]"
							:placeholder="xlb.pd"
							v-show="(flag == 0 || bjxqitem == '添加') && xlb.name != '客户地址：'"
							min-height="32rpx"
							style="height: 20px;font-size: 32rpx;"
						/>
					</view>
				</view>
			</view>

			<view class="dban" v-if="flag == '0' || bjxqitem == '添加'"><button class="cl" @click="bc">保存</button></view>
		</view>
		<!-- </view> -->
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { toggle } from '../../hr.js';
import { back } from './common.js';
import './common.scss';
export default {
	mounted() {
		// this.gdxq();
		console.log(this.flag);
		const _this = this;
		uni.getStorage({
			key: 'zhmm',
			success: function(res) {
				console.log(res);
				_this.surveyPerson = res.data.kcry;
			}
		});

		this.bjxqitem == '添加' ? (this.ymbt = '新增客戶') : (this.ymbt = '查看客戶') && (this.form2 = this.bjxqitem);
		if (!this.form2.clientAddress.trim()) {
			console.log(this.form2.clientAddress);
			console.log('bbb');
			this.sxdz();
		}
		console.log(this.form2);
		let form2 = this.form2;
		Object.keys(form2).forEach(function(key) {
			// console.log(form2[key])
			form2[key] == null ? (form2[key] = '') : '';
		});

		// console.log(form2)
	},
	data() {
		return {
			ymbt: '',
			surveyPerson: '',
			form2: {
				clientName: '',
				clientAddress: '',
				clientLinkman: '',
				clientLink: '',
				director: '',
				directorPhone: '',
				leader: '',
				leaderPhone: '',
				worker: '',
				workerPhone: '',
				money: '',
				intention: ''
			},
			items2: [
				{
					btlj: '/static/xz/khxx.png',
					btmz: '客户信息',
					xdbf: [
						{
							name: '客户名称：',
							prop: 'clientName',
							pd: '请输入客户名称'
						},
						{
							name: '客户地址：',
							prop: 'clientAddress',
							pd: '请输入地址'
						},
						{
							name: '联系人：',
							prop: 'clientLinkman',
							pd: '请输入姓名'
						},
						{
							name: '联系电话：',
							prop: 'clientLink',
							pd: '请输入电话'
						}
					]
				},
				{
					btlj: '/static/xz/yhxx.png',
					btmz: '负责人信息',
					xdbf: [
						{
							name: '分管主任：',
							prop: 'director',
							pd: '请输入姓名'
						},
						{
							name: '主任电话：',
							prop: 'directorPhone',
							pd: '请输入电话'
						},
						{
							name: '分管领导：',
							prop: 'leader',
							pd: '请输入姓名'
						},
						{
							name: '领导电话：',
							prop: 'leaderPhone',
							pd: '请输入电话'
						}
					]
				},
				{
					btlj: '/static/xz/yhdgxx.png',
					btmz: '用户电工信息',
					xdbf: [
						{
							name: '电工名称：',
							prop: 'worker',
							pd: '请输入姓名'
						},
						{
							name: '电工电话：',
							prop: 'workerPhone',
							pd: '请输入联系电话'
						}
					]
				},
				{
					btlj: '/static/xz/fzje.png',
					btmz: '非招金额',
					xdbf: [
						{
							name: '备注：',
							prop: 'money',
							pd: '请输入内容'
						}
					]
				},
				{
					btlj: '/static/xz/dwyy.png',
					btmz: '代维意愿',
					xdbf: [
						{
							name: '强烈',
							prop: '0'
						},
						{
							name: '有顾虑',
							prop: '4'
						},
						{
							name: '一般',
							prop: '1'
						},
						{
							name: '不重视',
							prop: '2'
						}
					]
				}
			],
			xdbf: [
				{
					name: '强烈',
					prop: '0'
				},

				{
					name: '有顾虑',
					prop: '4'
				},
				{
					name: '一般',
					prop: '1'
				},
				{
					name: '不重视',
					prop: '2'
				}
			],
			gthesf: [
				{
					name: '是',
					prop: '0'
				},

				{
					name: '否',
					prop: '1'
				}
			]
		};
	},

	watch: {
		form2(newVal, oldVal) {
			console.log(newVal);
		}
	},
	computed: {
		...mapState(['ip', 'id', 'flag', 'bjxqitem', 'gdid'])
	},
	methods: {
		//刷新地址
		sxdz(val) {
			const _this = this;
			console.log(this.flag == '0');

			if (this.flag == '0' || this.bjxqitem == '添加') {
				// #ifdef APP-PLUS
				plus.geolocation.getCurrentPosition(
					function(p) {
						this.form2.clientAddress = p.addresses;
					}.bind(this)
				);
				// plus.geolocation.getCurrentPosition(
				// 	function(p) {
				// 		console.log(p);
				// 		_this.form2.clientAddress = p.addresses;
				// 		console.log(p.addresses);
				// 		val == 'sx'
				// 			? uni.showToast({
				// 					title: '刷新地址成功',
				// 					duration: 2000
				// 			  })
				// 			: '';
				// 	},
				// 	function(e) {
				// 		console.log('Geolocation error: ' + e.message);
				// 	}
				// );
				// #endif
			}
		},
		radioChange: function(evt) {
			console.log(evt);
			this.form2.intention = evt.detail.value;
		},
		radioChangesf: function(evt) {
			console.log(evt);
			this.form2.inform = evt.detail.value;
		},
		//保存
		bc() {
			const _this = this;
			this.form2['userId'] = _this.id;
			this.form2['surveyPerson'] = _this.surveyPerson;
			// this.form2['flag'] = _this.flag;
			delete this.form2.surveyTime;
			console.log(this.form2);
			let dx = this.form2;
			// hhh != undefined && hhh != ''
			// const isBelowThreshold = (currentValue) => currentValue !='';
			const array1 = Object.values(this.form2);
			// !(dx.clientName.trim() && dx.clientAddress.trim() && dx.clientLinkman.trim() && dx.clientLink.trim())
			!array1.slice(0, 4).every(item => item.trim())
				? // Object.values(this.form2).length < 15
				  uni.showToast({
						icon: 'none',
						icon: 'none',
						title: '必填信息不能为空',
						duration: 2000
				  })
				: this.bjxqitem == '添加'
				? uni.request({
						url: this.ip + '/info-surveys',
						// url: 'http://183.252.1.140:81/api/workorder-lists/getWorkOrderList',

						data: _this.form2,
						method: 'POST',
						success: res => {
							console.log(res.data);
							uni.showToast({
								title: '新增成功',
								duration: 2000
							});

							_this.$nextTick(function() {
								_this.form2 = {};
							});
							_this.$EvenBus.$emit('qzsx');
							back();
							// _this.items = res.data.content;
						}
				  })
				: this.xg();
		},
		//修改
		xg() {
			const _this = this;
			uni.request({
				url: this.ip + '/info-surveys/' + this.gdid, //仅为示例，并非真实接口地址。
				data: this.form2,
				method: 'PUT',
				success: res => {
					console.log(res.data);
					_this.$EvenBus.$emit('qzsx');
					back();
				}
			});
		},
		back() {
			// back();
			this.$EvenBus.$emit('qzsx');
			// uni.reLaunch({
			// 	url: './assetTag/assetTag'
			// });
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style scoped lang="scss">
uni-input {
}
.uni-input-placeholder {
	font-size: 32rpx !important;
}

.ztbjs {
	background-color: rgba(249, 249, 249, 1);
	height: 100%;
	overflow: auto;
	position: absolute;
	width: 100%;
}

$bjs1: #006569;
.dban {
	.cl {
		background-color: $bjs1;
		width: 335px;
		// margin-top: 50px;
		color: white;
	}
	position: absolute;
	bottom: 11px;
	display: flex;
	justify-content: center;
	width: 100%;
}

.title {
	background: $bjs1;

	padding: 33px 0rpx 12px 0rpx;
	position: fixed;
	top: 0px;
	z-index: 100;
	width: 100%;

	color: white;

	text {
		color: #ffffff;
	}

	.iconImg {
		width: 48rpx;
		height: 48rpx;
		// padding-left: 30rpx;
		margin-left: 30rpx;
		position: absolute;
	}

	.zt {
		font-size: 36rpx;
		margin: 0 auto;
		width: 346rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: center;
	}

	.next {
		font-size: 28rpx;
		right: 30rpx;
		position: absolute;
	}
}
</style>
