<template>
	<view>
		<assetTag v-if="iscomponent == 'assetTag'"></assetTag>
		<jy v-else-if="iscomponent == 'jy'"></jy>
	

		<navigation :anArray="anArray"></navigation>
	</view>
</template>

<script>
import { anArray } from '../index/assetTag/data.js';
import navigation from '@/components/navigation.vue';
import assetTag from '../index/assetTag/assetTag.vue';
import jy from '../jy/jy.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	components: {
		navigation,
		assetTag,
		jy
	},
	computed: {
		...mapState(['iscomponent'])
	},
	data() {
		return {
			anArray: anArray
		};
	}
};
</script>

<style lang="scss"></style>
