function back() {
	uni.navigateBack({
		delta: 1
	});
	// uni.navigateTo({
	//     url: '/pages/zymlb/zymlb'
	// });
}

function tcts(bt) {
	uni.showToast({
		title: bt,
		duration: 1500
	});
}
export {
	back,
	tcts
}
