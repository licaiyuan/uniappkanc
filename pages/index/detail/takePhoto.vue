<template>
	<view>
		<view class="listBorder">
			<view class="listStyle">
				<view><image :src="tplj" class="imgClock"></image></view>
				<view
					style="marginLeft:12rpx
				 ;"
				>
					<!-- <view class="title">现场勘察</view> -->
					<view class="detail">
						<view class="xqxbt">{{ title }}</view>
						<view>{{ remark }}</view>
					</view>
				</view>
			</view>
			<view>
				<robby-image-upload
					@delete="deleteImage"
					@add="addImage"
					:server-url-delete-image="serverUrlDeleteImage"
					:server-url="serverUrl"
					:gdid="gdid"
					:typeid="typeid"
					:value="value"
				></robby-image-upload>
			</view>
		</view>
	</view>
</template>

<script>
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
export default {
	components: {
		robbyImageUpload
	},
	props: ['title', 'gdid', 'value', 'typeid', 'ip', 'remark'],
	computed: {},

	mounted() {
		this.tplj = '/static/scxmzp/' + this.typeid + '.png';
	},
	watch: {},
	computed: {},
	data() {
		return {
			tplj: '',
			enableDel: false,
			enableAdd: false,
			enableDrag: false,
			limitNumber: 8,
			imageData: [],

			serverUrl: this.ip,
			serverUrlDeleteImage: 'http://localhost:1234/work/deleteWorkPicture',
			formData: {
				userId: 2
			}
		};
	},
	onLoad() {},
	methods: {
		deleteImage: function(e) {
			console.log(e);
		},
		addImage: function(e) {
			console.log(e);
		}
	}
};
</script>

<style scoped lang="scss">
.listBorder {
	background: white;
	padding: 20rpx 0rpx;
	margin-top: 20rpx;
}

.addBorder {
	border: 1px solid #515151;
	padding: 15px;
	width: 50px;
}

.listStyle {
	display: flex;
	flex-direction: row;
	border-bottom: solid 1px rgba(240, 240, 240, 1);
	padding-bottom: 24rpx;
	align-items: flex-start;
	button {
		margin-right: 0px;
	}

	.title {
		font-size: 32rpx;
	}

	.detail {
		color: rgba(153, 153, 153, 1);
		font-size: 24rpx;
		margin: 0px 5px;
		line-height: 46rpx;
		.xqxbt {
			font-size: 32rpx;
			// font-weight: bold;
			color: black;
		}
	}
}

.imgClock {
	width: 50rpx;
	height: 50rpx;
	margin-left: 30rpx;
}
</style>
