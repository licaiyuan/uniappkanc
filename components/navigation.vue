<template>
	<view>
		<view :class="[model=='iPhoneX'?'bj2':'bj']">
		<!-- <view class="bj2"> -->
			<view v-for="(item, index) in anArray" :key="index" @click="chooseUrl(item)">
				<view v-if="chooseItem == item.name" class="an">
					<image :src="item.yxzimg"></image>
					<text class=" yxzzt">{{ item.name }}</text>
				</view>
				<view v-else class="an">
					<view class="zthtp">
						<image :src="item.wxzimg"></image>
						<text class="dhzt">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	computed: {
		...mapState(['chooseItem'])
	},
	props: ['anArray'],
	data() {
		return {
			model: ''
		};
	},
	onLoad() {},
	mounted() {
		uni.getSystemInfo({
			success: res => {
				this.model = res.model;
				console.log(res.model);
			}
		});
	},
	methods: {
		...mapMutations(['chooseUrl'])
	}
};
</script>

<style lang="scss" scoped>
.zthtp {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

.bj {
	background-color: white;
	border-top: solid 1px #e5e5e5;
	position: fixed;
	bottom: 0px;
	// padding: 30rpx 0px 8rpx 0rpx;
	width: 100%;
	height: 98rpx;
	z-index: 100;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.18);
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;

	// padding-bottom: 15px;
	.an {
		padding: 0 22.27rpx;

		display: flex;
		flex-direction: column;
		text-align: center;
		text-align: center;

		image {
			width: 48rpx;
			height: 48rpx;
			margin: 0 auto;
		}
	}
}
.bj2 {
	@extend .bj;
	// padding: 15px 0;
	padding-bottom: 15px;
}
.dhzt {
	font-size: 26rpx;
	color: rgba(197, 194, 194, 1);
	margin-top: 4rpx;
}

.yxzzt {
	font-size: 26rpx;
	color: #03757a;
	margin-top: 4rpx;
}
</style>
