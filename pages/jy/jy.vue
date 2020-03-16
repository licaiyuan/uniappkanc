<template>
	<view>
		<view class="ztbjs">
			<view class="title"><view class="zt">经验</view></view>
			<view style="margin-top: 78px;overflow: auto;height: 89%;">
				<uni-collapse accordion="true">
					<uni-collapse-item
						v-for="item in jylb"
						:key="item.parentTitleInEn"
						:title="item.parentTitle"
						:thumb="item.src"
						animation="true"
						style="font-size: 30rpx;font-weight: bold;"
					>
						<view class="xlb">
							<view v-for="item2 in item.list" :key="item2.id" class="xxlb">
								<view style="font-size: 15px;font-weight: bold;">{{ item2.title }}</view>
								<view style="font-size: 14px;font-weight: normal;">{{ item2.content }}</view>
							</view>
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
			<!-- 	<video
				id="myVideo"
				src="http://119.3.157.129:9898/downloadFile/111.mp4"
				@error="videoErrorCallback "
			
				controls
			></video> -->
		</view>
	</view>
</template>

<script>
import { uniCollapse, uniCollapseItem } from '@dcloudio/uni-ui';
import '../index/common.scss';
export default {
	components: {
		uniCollapse,
		uniCollapseItem
	},
	mounted() {
		this.qqjy();
	},
	methods: {
		//请求经验
		async qqjy() {
			let res = await this.$api.jyqq();
			console.log(res);
			res.data.content.forEach(item => {
				item.src = `/static/jy/${item.parentTitleInEn}.png`;
			});
			this.jylb = res.data.content;
		},
		videoErrorCallback: function(e) {
			console.log(e);
			// uni.showModal({
			// 	content: e.target.errMsg,
			// 	showCancel: false
			// });
		}
	},
	data() {
		return {
			jylb: []
		};
	}
};
</script>

<style lang="scss">
.xlb {
	background: white;
	.xxlb {
		padding: 15px;
		border-bottom: solid 1px #eaeaea;
	}
}
</style>
