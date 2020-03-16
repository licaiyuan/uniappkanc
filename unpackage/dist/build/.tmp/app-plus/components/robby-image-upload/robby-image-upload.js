(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/robby-image-upload/robby-image-upload"],{"059a":function(e,t,i){"use strict";var a=i("962c"),o=i.n(a);o.a},"098e":function(e,t,i){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i("2f62");function n(e,t){return l(e)||r(e,t)||s()}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function r(e,t){var i=[],a=!0,o=!1,n=void 0;try{for(var s,r=e[Symbol.iterator]();!(a=(s=r.next()).done);a=!0)if(i.push(s.value),t&&i.length===t)break}catch(l){o=!0,n=l}finally{try{a||null==r["return"]||r["return"]()}finally{if(o)throw n}}return i}function l(e){if(Array.isArray(e))return e}function u(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},a=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),a.forEach(function(t){g(e,t,i[t])})}return e}function g(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var c={name:"robby-image-upload",props:["gdid","typeid","value","enableDel","enableAdd","enableDrag","serverUrl","formData","header","limit","fileKeyName","serverUrlDeleteImage"],data:function(){return{imageBasePos:{x0:-1,y0:-1,w:-1,h:-1},ylshow:!1,yltpsrc:"",showMoveImage:!1,moveImagePath:"",moveLeft:0,moveTop:0,deltaLeft:0,deltaTop:0,dragIndex:null,targetImageIndex:null,imageList:[],isDestroyed:!1,qqurl:""}},watch:{value:function(t,i){this.imageList=this.clfileid(this.value),console.log(e(this.newVal," at components\\robby-image-upload\\robby-image-upload.vue:47"))}},mounted:function(){console.log(e(this.flag," at components\\robby-image-upload\\robby-image-upload.vue:52")),this.clfileid(this.value),this.qqurl=this.serverUrl+"/info-surveys/bindImg?moduleId="+this.gdid+"&type="+this.typeid},destroyed:function(){this.isDestroyed=!0},computed:u({},(0,o.mapState)(["flag"]),{imageListData:function(){if(this.value)return this.value},posMoveImageLeft:function(){return this.moveLeft+"px"},posMoveImageTop:function(){return this.moveTop+"px"},isShowDel:function(){return"1"!=this.flag},isShowAdd:function(){return!1!==this.enableAdd&&!(this.limit&&this.imageList.length>=this.limit)},isDragable:function(){return!1!==this.enableDrag}}),methods:{clfileid:function(t){var i=this;t.forEach(function(e){i.imageList.push({src:i.serverUrl+"/fs/files/"+e+"/0",fileId:e})}),console.log(e(this.imageList," at components\\robby-image-upload\\robby-image-upload.vue:109"))},selectImage:function(){var t=this;t.imageList||(t.imageList=[]),a.chooseImage({count:t.limit?t.limit-t.imageList.length:1,success:function(i){var o=i.tempFilePaths;if(t.limit){var s=t.limit-t.imageList.length;if(s<o.length)return void a.showToast({title:"图片总数限制为"+t.limit+"张，当前还可以选"+s+"张",icon:"none",mask:!1,duration:2e3})}if(t.serverUrl){for(var r=t.imageList.length-o.length,l=[],u=function(i){l.push(new Promise(function(n,s){var l=r+i;a.uploadFile({url:t.qqurl,fileType:"image",header:t.header,filePath:o[i],name:"file",success:function(r){if(200===r.statusCode){if(t.isDestroyed)return;a.saveImageToPhotosAlbum({filePath:o[i],success:function(){console.log(e("save success"," at components\\robby-image-upload\\robby-image-upload.vue:170"))}}),0,console.log(e("success to upload image: "+r.data," at components\\robby-image-upload\\robby-image-upload.vue:183")),n(r.data)}else console.log(e("fail to upload image:"+r.data," at components\\robby-image-upload\\robby-image-upload.vue:186")),s("fail to upload image:"+l)},fail:function(t){console.log(e("fail to upload image:"+t," at components\\robby-image-upload\\robby-image-upload.vue:191")),s("fail to upload image:"+l)}})}))},g=0;g<o.length;g++)u(g);Promise.all(l).then(function(i){console.log(e(i," at components\\robby-image-upload\\robby-image-upload.vue:202"));var o=n(i,1),s=o[0],r=JSON.parse(s),l=n(r.content,1),u=l[0];a.showToast({title:"上传成功",duration:2e3}),t.clfileid([u])})}}})},deleteImage:function(t,i){this.imageList.splice(i,1),console.log(e(t," at components\\robby-image-upload\\robby-image-upload.vue:240")),this.serverUrlDeleteImage&&a.request({url:this.serverUrl+"/file-modules/"+t.fileId,method:"DELETE",success:function(t){console.log(e(t.data," at components\\robby-image-upload\\robby-image-upload.vue:248")),a.showToast({title:"删除成功",duration:2e3})}})},previewImage:function(e,t){var i=[];e.forEach(function(e){i.push(e.src)}),a.previewImage({current:e[t].src,indicator:"number",loop:"true",urls:i})},initImageBasePos:function(){var e=.024,t=this;a.getSystemInfo({success:function(i){var a=i.screenWidth,o=Math.ceil(e*a),n=Math.ceil((a-2*o)/4);t.imageBasePos.x0=o,t.imageBasePos.w=n,t.imageBasePos.h=n}})},findOverlapImage:function(e,t){var i=Math.floor((e-this.imageBasePos.x0)/this.imageBasePos.w),a=Math.floor((t-this.imageBasePos.y0)/this.imageBasePos.h),o=4*a+i;return o},isDragging:function(e){return this.dragIndex===e},start:function(t){if(console.log(e(this.isDragable," at components\\robby-image-upload\\robby-image-upload.vue:315")),this.isDragable){if(this.dragIndex=t.currentTarget.dataset.index,this.moveImagePath=this.imageList[this.dragIndex],this.showMoveImage=!0,-1===this.imageBasePos.y0){this.initImageBasePos();var i=Math.floor(this.dragIndex/4)*this.imageBasePos.h,a=t.currentTarget.offsetTop;this.imageBasePos.y0=a-i}this.moveLeft=t.target.offsetLeft,this.moveTop=t.target.offsetTop}},move:function(e){if(this.isDragable){var t=e.touches[0];this.targetImageIndex=this.findOverlapImage(t.clientX,t.clientY),0===this.deltaLeft&&(this.deltaLeft=t.clientX-this.moveLeft,this.deltaTop=t.clientY-this.moveTop),this.moveLeft=t.clientX-this.deltaLeft,this.moveTop=t.clientY-this.deltaTop}},stop:function(e){this.isDragable&&(null!==this.dragIndex&&null!==this.targetImageIndex&&(this.targetImageIndex<0&&(this.targetImageIndex=0),this.targetImageIndex>=this.imageList.length&&(this.targetImageIndex=this.imageList.length-1),this.dragIndex!==this.targetImageIndex&&(this.imageList[this.dragIndex]=this.imageList[this.targetImageIndex],this.imageList[this.targetImageIndex]=this.moveImagePath)),this.dragIndex=null,this.targetImageIndex=null,this.deltaLeft=0,this.deltaTop=0,this.showMoveImage=!1,this.$emit("input",this.imageList))}}};t.default=c}).call(this,i("0de9")["default"],i("6e42")["default"])},"0d41":function(e,t,i){"use strict";i.r(t);var a=i("098e"),o=i.n(a);for(var n in a)"default"!==n&&function(e){i.d(t,e,function(){return a[e]})}(n);t["default"]=o.a},"962c":function(e,t,i){},edd9:function(e,t,i){"use strict";var a,o=function(){var e=this,t=e.$createElement,i=(e._self._c,e.__map(e.imageList,function(t,i){var a=e.isDragging(i);return{$orig:e.__get_orig(t),m0:a}}));e._isMounted||(e.e0=function(t){e.ylshow=!e.ylshow}),e.$mp.data=Object.assign({},{$root:{l0:i}})},n=[];i.d(t,"b",function(){return o}),i.d(t,"c",function(){return n}),i.d(t,"a",function(){return a})},f8bc:function(e,t,i){"use strict";i.r(t);var a=i("edd9"),o=i("0d41");for(var n in o)"default"!==n&&function(e){i.d(t,e,function(){return o[e]})}(n);i("059a");var s,r=i("f0c5"),l=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);t["default"]=l.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/robby-image-upload/robby-image-upload-create-component',
    {
        'components/robby-image-upload/robby-image-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("f8bc"))
        })
    },
    [['components/robby-image-upload/robby-image-upload-create-component']]
]);