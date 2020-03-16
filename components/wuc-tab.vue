<template>
	<scroll-view class="wuc-tab" :class="tabClass" :style="tabStyle" scroll-with-animation scroll-x :scroll-left="scrollLeft">
		<div v-if="!textFlex" class="tabSwiper">
			<div
				class="wuc-tab-item"
				:class="[index === tabCur ? selectClass + ' cur' : '']"
				v-for="(item, index) in tabList"
				:key="index"
				:id="index"
				@tap="tabSelect(index, $event)"
			>
				<text :class="item.icon"></text>
				<span>{{ item.name }}</span>
			</div>
		</div>

		<div class="flex text-center" v-if="textFlex">
			<div
				class="wuc-tab-item flex-sub"
				:class="index === tabCur ? selectClass + ' cur' : ''"
				v-for="(item, index) in tabList"
				:key="index"
				:id="index"
				@tap="tabSelect(index, $event)"
			>
				<text :class="item.icon"></text>
				<span>{{ item.name }}</span>
			</div>
		</div>
	</scroll-view>
</template>
<script>
export default {
	name: 'wuc-tab',
	data() {
		return {};
	},
	props: {
		classxz: {},
		tabList: {
			type: Array,
			default() {
				return [];
			}
		},
		tabCur: {
			type: Number,
			default() {
				return 0;
			}
		},
		tabClass: {
			type: String,
			default() {
				return '';
			}
		},
		tabStyle: {
			type: String,
			default() {
				return '';
			}
		},
		textFlex: {
			type: Boolean,
			default() {
				return false;
			}
		},
		selectClass: {
			type: String,
			default() {
				return 'text-blue';
			}
		}
	},
	mounted() {
		console.log(this.classxz);
	},
	methods: {
		tabSelect(index, e) {
			if (this.currentTab === index) return false;
			this.$emit('update:tabCur', index);
			this.$emit('change', index);
		}
	},
	computed: {
		scrollLeft() {
			return (this.tabCur - 1) * 60;
		}
	}
};
</script>
<style lang="scss" scoped>
div,
scroll-view,
swiper {
	box-sizing: border-box;
}

.wuc-tab {
	white-space: nowrap;
}

.wuc-tab-item {
	width: 33%;
	text-align: center;
	height: 90upx;
	display: inline-block;
	// line-height: 90upx;
	margin: 0 63upx;
	padding: 0 20upx;
	color: rgba(244, 247, 253, 0.38);
	font-size: 32rpx;
	line-height: 90rpx;
	font-weight: 500;
}

.wuc-tab-item2 {
	height: 90upx;
	display: inline-block;
	line-height: 90upx;

	padding: 0 48rpx;
	color: white;
	font-size: 31.18rpx;
}

.wuc-tab-item.cur {
	color: white;
	font-size: 30rpx;
}

.wuc-tab-item.cur span {
	font-size: 30rpx;
	border-bottom: 4upx solid white;
	padding-bottom: 7px;
}

.wuc-tab.fixed {
	position: fixed;
	width: 100%;
	top: 0;
	z-index: 1024;
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
}

.flex {
	display: flex;
}

.text-center {
	text-align: center;
}

.flex-sub {
	flex: 1;
}

.text-blue {
	color: white;
}

.text-white {
	color: #ffffff;
}

.bg-white {
	background-color: #ffffff;
}

.bg-blue {
	background-color: #0081ff;
}

.text-orange {
	color: #f37b1d;
	// color: #333333;
}

.text-xl {
	font-size: 36upx;
}
</style>
