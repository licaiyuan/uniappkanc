<template>
	<view class="ztbjs">
		<image class="logo" src="/static/loginbg.png"></image>
		<view class="xckcbt"><text>现场勘察管理</text></view>

		<view class="inputGroup">
			<view class="dlbt">登录</view>
			<view class="tpinput">
				<image src="/static/zh.png"></image>
				<input class="uni-input" v-model="username" placeholder="请输出账号" />
			</view>
			<view class="tpinput">
				<image src="/static/mm.png"></image>
				<input class="uni-input" v-model="password" placeholder="请输入密码" type="password" />
			</view>
			<view class="anjz" style="text-align: center;"><button type="primary" @click="login" class="login">登录</button>
			<text class="ljzc" @click="ljzc">立即注册</text>
			</view>
		</view>
		<Modal v-model="show" title="版本更新" text="有新的版本发布，是否立即进行新版本下载？" @event="event" />
	</view>
</template>

<script>
import './common.scss';
import md5 from 'js-md5';
import Modal from '@/components/x-modal/x-modal';
import { mapState, mapMutations, mapGetters } from 'vuex';
// import {toggle} from '../../hr.js'
// var fly = require("flyio");

export default {
	// mixins: [toggle],
	data() {
		return {
			username: '',
			password: '',
			version: 105,
			show: false
		};
	},
	computed: {
		...mapState(['ip'])
	},
	mounted() {
		// this.back()
		let _this = this;
		uni.getStorage({
			key: 'zhmm',
			success: function(res) {
				console.log(res);

				let { username, password } = res.data;

				_this.username = username;
				_this.password = password;
			}
		});
	},
	components: {
		Modal
	},
	onShow() {
		uni.getSystemInfo({
			success: res => {
				//检测当前平台，如果是安卓则启动安卓更新
				if (res.platform == 'android') {
					this.AndroidCheckUpdate();
				}
			}
		});
	
	},
	onLoad() {},
	methods: {
		//立即注册
		ljzc(){
			uni.navigateTo({
			    url: '../zcjm'
			});
		},
		event(e) {
			console.log(e);
			let { from } = e;

			if (from == 'confirm') {
				var downloadApkUrl = 'http://ops.xmrtc.com/api/fs/files/650998950186323968/0';
				var dtask = plus.downloader.createDownload(downloadApkUrl, { filename: '_doc/update/' }, function(d, status) {
					// 下载完成

					if (status == 200) {
						plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, function(error) {
							uni.showToast({
								title: '安装失败',
								duration: 1500
							});
						});
					} else {
						uni.showToast({
							title: '更新失败',
							duration: 1500
						});
					}
				});
				uni.showToast({
					icon: 'none',
					mask: true,
					title: '正在下载中。新版本下载完成后将自动弹出安装程序',
					duration: 5000
				});
				dtask.start();
			}
		},
		TimeDifference(time1, time2) {
			//判断开始时间是否大于结束日期
			if (time1 > time2) {
				alert('开始时间不能大于结束时间！');
				return false;
			}

			//截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
			var begin1 = time1.substr(0, 10).split('-');
			var end1 = time2.substr(0, 10).split('-');

			//将拆分的数组重新组合，并实例成化新的日期对象
			var date1 = new Date(begin1[1] + -+begin1[2] + -+begin1[0]);
			var date2 = new Date(end1[1] + -+end1[2] + -+end1[0]);

			//得到两个日期之间的差值m，以分钟为单位
			//Math.abs(date2-date1)计算出以毫秒为单位的差值
			//Math.abs(date2-date1)/1000得到以秒为单位的差值
			//Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
			var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);

			//小时数和分钟数相加得到总的分钟数
			//time1.substr(11,2)截取字符串得到时间的小时数
			//parseInt(time1.substr(11,2))*60把小时数转化成为分钟
			var min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
			var min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));

			//两个分钟数相减得到时间部分的差值，以分钟为单位
			var n = min2 - min1;

			//将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
			var minutes = m + n;

			return minutes;
		},

		AndroidCheckUpdate: function() {
			var _this = this;
			uni.request({
				//请求地址，设置为自己的服务器链接
				url: this.ip + '/info-surveys/queryAppVersion',
				//method: 'GET',
				data: {},
				success: resMz => {
					let { version, timestamp } = resMz.data.content;
					// var server_version = resMz.data.content.version;
					// var currTimeStamp = resMz.data.content.timestamp;
					// 判断缓存时间
					uni.getStorage({
						key: 'tip_version_update_time',
						success: function(res) {
							var lastTimeStamp = res.data;
							//定义提醒的时间间隔，避免烦人的一直提示，一个小时：3600；一天：86400

							if (_this.TimeDifference(lastTimeStamp, timestamp) < 60) {
								//避免多次提醒，不要更新
								console.log('避免多次提醒，不要更新');
							} else {
								//重新设置时间戳
								_this.setStorageForAppVersion(timestamp);
								//进行版本型号的比对 以及下载更新请求
							}
							_this.checkVersionToLoadUpdate(version, _this.version);
						},
						fail: function(res) {
							_this.setStorageForAppVersion(timestamp);
						}
					});
				},
				fail: () => {},
				complete: () => {}
			});
		},
		/**
		 * //设置应用版本号对应的缓存信息
		 * @param {Object} currTimeStamp 当前获取的时间戳
		 */
		setStorageForAppVersion: function(currTimeStamp) {
			uni.setStorage({
				key: 'tip_version_update_time',
				data: currTimeStamp,
				success: function() {
					console.log('setStorage-success');
				}
			});
		},
		/**
		 * 进行版本型号的比对 以及下载更新请求
		 * @param {Object} server_version 服务器最新 应用版本号
		 * @param {Object} curr_version 当前应用版本号
		 */
		checkVersionToLoadUpdate(server_version, curr_version) {
			if (server_version > curr_version) {
				//TODO 此处判断是否为 WIFI连接状态
				this.show = true;
			}
		},

		...mapMutations(['fzid']),
		login() {
			const _this = this;
			console.log('xxx');
			uni.request({
				url: this.ip + '/login', //仅为示例，并非真实接口地址。
				data: {
					password: md5(this.password),
					username: this.username
				},
				method: 'POST',

				success: res => {
					console.log(res.data);
					if (res.data.code === 200) {
						_this.fzid(res.data.content);
						uni.setStorage({
							key: 'zhmm',
							data: {
								username: _this.username,
								password: _this.password,
								kcry: res.data.content.username
							},
							success: function() {
								console.log('success');
							}
						});
						uni.showToast({
							title: '登录成功',
							duration: 2000
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '登陆失败',
							duration: 2000
						});
					}
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.logo {
	height: 236px;
	width: 100%;
}
.xckcbt {
	position: absolute;
	z-index: 200;
	top: 100px;
	width: 100%;
	display: flex;
	justify-content: center;
	color: white;
	font-weight: bold;
	font-size: 48rpx;
	letter-spacing: 6rpx;
}
image {
	height: 38rpx;
	width: 38rpx;
}
.ljzc{
	    font-size: 28rpx;
	  
	    color: #058287;
	    position: relative;
	    top: 25px;
}
.inputGroup {
	margin-top: 40px;
	padding: 28px 28px 53px 28px;
	position: relative;
	bottom: 46px;
	background: white;
	border-radius: 23px;
	width: 300px;
	margin: 0 auto;
	/* left: 9px; */
	display: block;
}

.uni-input {
	width: 260px;
	height: 30px;
	font-size: 16px;
	text-indent: 1em;
	color: #999;
	border: none;
}
.dlbt {
	position: relative;
	left: 17px;
	font-size: 38rpx;

	font-weight: 520;
}
.tpinput {
	border: 1px solid #efeff4;
	width: 260px;
	height: 30px;
	margin: 18px;
	padding: 5px;
	border-radius: 10px;
}
</style>
