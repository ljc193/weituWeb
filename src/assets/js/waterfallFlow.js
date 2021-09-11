
import Request from './request.js'
import { baseUrl } from "./urlConfig.js"
import Videojs from 'video.js'
import 'video.js/dist/video-js.css'
$(function() {
	function isPhone() {
		if($(window).width()<993) {  // 移动设备
			return true;
		}else {
			return false;
		}
	}
	var isPhones = isPhone();
	var pageNumber=1;  // 当前页
	var categoryFKID = ""; // 所属类型
	var projectlabel = '';  // 当前标签
	var column = 3,pers = "",perWidth = isPhones?'100%':parseInt($('.content_wrapper').width()/column-2)+'px';
	var playerIcon = require('../img/playIcon.png');  // 播放图片
	var picPro = require('../img/picPro.png');  // 项目集图片
	var allProject = [];
	var myPlayer = null;
	var preventRequest = false; //防止多次重复请求
	function isPicLoad() {
		return new Promise((resolve,reject)=>{
			var img_length = $(".picPro").length;
			var img_start = 1;
			$(".picPro").on('load',function(){
				if(img_start == img_length){
					resolve(true)
				}else {
					img_start ++;
				}
			})
		})
	}
	// 获取标签 
	Request('/mh/project/tagList',{},'GET').then(res=>{
		if(res.code==200) {
			var labels = res.data;
			labels.unshift('所有')
			var as = new Set(labels);  // 去重
			labels = [...as]
			
			if(isPhones) {
				var labDOm_p = '';
				// 生成标签
				for(var i=0;i<labels.length;i++) {
					labDOm_p += `<div class=list_container-item data-id=`+ labels[i] +` >
									`+ labels[i] +`
								</div>`
				}
				$('.dropDown_wrapper').find('.list_container').find('.list_container-content').append(labDOm_p);
				
				// 添加点击事件
				$('.dropDown_wrapper').find('.icon_drop').click(function() {
					$('.dropDown_wrapper').find('.list_container').css({
						'display':"block"
					})
					$('.dropDown_wrapper').find('.list_container').animate({
						top:0,
						opacity:1
					},400)
				})
				$('.dropDown_wrapper').find('.upIncon').click(function() {
					$('.dropDown_wrapper').find('.list_container').animate({
						top:'2rem',
						opacity:0
					},400,function() {
						$('.dropDown_wrapper').find('.list_container').css({
							'display':"none"
						})
					})
				})
				$('.dropDown_wrapper').find('.list_container').find('.list_container-item').eq(0).addClass('label_active');
				let listDom = $('.dropDown_wrapper').find('.list_container').find('.list_container-item');
				// 标签点击
				listDom.click(function() {
					preventRequest = true;
					setTimeout(()=>{
						preventRequest = false;
					},500)
					listDom.removeClass('label_active');
					listDom.eq($(this).index()).addClass('label_active');
					if($(this).attr('data-id')==="所有") {
						projectlabel = '';
					}else {
						projectlabel = $(this).attr('data-id');
					}
					pageNumber = 1;  // 重置页码
					allProject = [];  // 重置数组
					pers = "",  // 重置dom
					$('.content_wrapper').empty();  // 清空Dom
					// 请求
					getData().then(res=>{
						$('.dropDown_wrapper').find('.list_container').animate({
							top:'2rem',
							opacity:0
						},400,function() {
							$('.dropDown_wrapper').find('.list_container').css({
								'display':"none"
							})
						})
						if(res) {
							isPicLoad().then(back=>{
								if(back) {
									waterFlow(); 
								}
							})
						}else {
							let noData = `<div class='noData'>暂无数据</div>`
							$('.content_wrapper').append(noData)
						} 
					})
				})
			}else {  // pc渲染
				var labDOm = '<ul>';
				// 生成标签
				for(var i=0;i<labels.length;i++) {
					labDOm += "<li data-id="+ labels[i] +" ><span class='title'>" + labels[i] + "</span><span class=line >/</span></li>"
				}
				labDOm += "</ul>"
				$('#tabLabel').append(labDOm).find('ul').find('li').eq(0).find('.title').addClass('label_active');
				$('#tabLabel').find('ul').find('li:last').find('.line').css('display','none');
				// li点击事件
				var liDoms = $('#tabLabel').find('ul').find('li');
				liDoms.click(function(){
					preventRequest = true;
					setTimeout(()=>{
						preventRequest = false;
					},500)
					liDoms.find('.title').removeClass('label_active');
					liDoms.eq($(this).index()).find('.title').addClass('label_active');
					if($(this).attr('data-id')==="所有") {
						projectlabel = '';
					}else {
						projectlabel = $(this).attr('data-id');
					}
					pageNumber = 1;  // 重置页码
					allProject = [];  // 重置数组
					pers = "",  // 重置dom
					$('.content_wrapper').empty();  // 清空Dom
					// 请求
					getData().then(res=>{
						if(res) {
							isPicLoad().then(back=>{
								if(back) {
									waterFlow(); 
								}
							}) 
						}else {
							let noData = `<div class='noData'>暂无数据</div>`
							$('.content_wrapper').append(noData)
						} 
					})
				})
			}
			
		}
	})
	
	
	// 获取大分类
	Request('/mh/category/list',{},'GET').then(res=>{
		if(res.code==200) {
			var tabs = res.data;
			tabs.unshift({
				id:"",
				englishName:'ALL',
				name:'全部'
			})
			// 生成tabs
			var perDom = "<ul>";
			for(var i=0;i<tabs.length;i++) {
				perDom += `<li data-id=`+ tabs[i].id +` >
								<span class='en'>` + tabs[i].englishName + `</span>
								<span class='cn'>` + tabs[i].name + `</span>
							</li>`
			}
			perDom += "</ul>"
			$('#tabContainer').append(perDom).find('ul').find('li').eq(0).find('span').addClass('tab_active');
			getData().then(res=>{
				if(res) {
					isPicLoad().then(back=>{
						if(back) {
							//加载完成
							waterFlow();
							$('#tabContainer').find('ul').find('li').each(function(i,d) {
								if(!isPhones) {
									$(d).css({
										'width':$(d).width()>30?$(d).width():30,
									})
								}
							})
							
							// 滚动监听
							window.onscroll = function() {
								if($(document).scrollTop()>100 && $(window).width()>993) {
									$(".toTop_wrapper").css('display','block')
								}else {
									$(".toTop_wrapper").css('display','none')
								}
								if($(document).scrollTop()+$(window).height()>=$(document).height()){
									if(!preventRequest) {
										pageNumber += 1;
										getData().then(res=>{
											if(res) {
												setTimeout(()=>{
													waterFlow();
												},1000) 
											} 
										}).catch(e=>{
											console.log('到底了！')
										})
									}
								}  
							}
						}
					})
				}
			})
			// li点击事件
			var liDom = $('#tabContainer').find('ul').find('li');
			liDom.click(function(){
				preventRequest = true;
				setTimeout(()=>{
					preventRequest = false;
				},500)
				liDom.find('span').removeClass('tab_active');
				$(this).find('span').addClass('tab_active');
				categoryFKID = $(this).attr('data-id');
				pageNumber = 1;  // 重置页码
				allProject = [];  // 重置数组
				pers = "",  // 重置dom
				$('.content_wrapper').empty();  // 清空Dom
				// 请求
				getData().then(res=>{
					if(res) {
						isPicLoad().then(back=>{
							if(back) {
								waterFlow(); 
							}
						})
					}else {
						let noData = `<div class='noData'>暂无数据</div>`
						$('.content_wrapper').append(noData)
					} 
				})
			})
		}
	})
	// 请求图片
	function getData() {
		pers = '';
		$('.loading_wrapper').css('display','block')
		return new Promise((resolve,reject)=>{
			Request('/mh/project/pagelist',{pageNum: pageNumber,pageSize: 12,categoryFKID:categoryFKID,projectlabel:projectlabel},'GET').then(res=>{
				if(res.code==200) {
					var imgList = res.data.list;
					if(!imgList.length) {
						pageNumber -= 1;
						$('.loading_wrapper').css('display','none')
						return resolve(false)
					}
					allProject = allProject.concat(imgList)
					// 创建第一行基准
					for(var i=0;i<imgList.length;i++) {
						if(imgList[i].type==1) {  // 图片
							pers += `<div class=box style=width:` + perWidth + `;opacity:0 >
										<div class=boximg data-id=`+ imgList[i].id +` data-type=`+ imgList[i].type +` >
											<img class=picPro src=`+baseUrl + imgList[i].cover+` />
											<div class=boximg-hoverwrapper  >
												<div class='boximg-hoverwrapper_c'>
													<span class=boximg-hoverWrapper-title >PROJECTS</span>
													<span class=boximg-hoverWrapper-name >`+ imgList[i].name +`</span>
												</div>
											</div>
										</div>
									</div>`
						}else if(imgList[i].type==2) {  //视频
							pers += `<div class=box style=width:` + perWidth + `;opacity:0 >
										<div class=boximg data-id=`+ imgList[i].id +` data-type=`+ imgList[i].type +` >
											<img class=playerIcon src = `+ playerIcon +` />
											<img class=picPro src=`+baseUrl + imgList[i].cover+`  />
											<div class=boximg-hoverwrapper  >
												<div class='boximg-hoverwrapper_c'>
													<span class=boximg-hoverWrapper-title >PROJECTS</span>
													<span class=boximg-hoverWrapper-name >`+ imgList[i].name +`</span>
												</div>
											</div>
										</div>
									</div>`
						}else if(imgList[i].type==3) {  // 图片集
							let pic = imgList[i].cover.split(',')[0];
							pers += `<div class=box style=width:` + perWidth + `;opacity:0 >
										<div class=boximg data-id=`+ imgList[i].id +` data-type=`+ imgList[i].type +`>
											<img class=playerIcon src = `+ picPro +` />
											<img class=picPro src=`+baseUrl + pic+`  />
											<div class=boximg-hoverwrapper  >
												<div class='boximg-hoverwrapper_c'>
													<span class=boximg-hoverWrapper-title >PROJECTS</span>
													<span class=boximg-hoverWrapper-name >`+ imgList[i].name +`</span>
												</div>
											</div>
										</div>
									</div>`
						}
						
					}
					$(pers).appendTo($('.content_wrapper'))
					resolve(true)
					
				}else {
					reject(false)
				}
			})
		})
		
	}
	// 根据type返回DOM
	function getDoms(newRow) {
		let doms = '';
		if(newRow.type == 1) {  // 图片
			doms = `<img src=`+ baseUrl + newRow.cover +` >`
		}else {  // 视频
			doms = `
					<video id='myVideo' class='videoPlayer video-js vjs-big-play-centered' controls data-setup="{}"  preload="auto">
						<source
							type="video/mp4"
							src=`+ baseUrl + newRow.video +`
						>
					</video>
				`
		}
		return doms;
	}
	
	//返回手机端和PC样式
	function backDom(newRow) {
		let doms = '';
		if(!isPhones) {
			doms = `<div class="singlePro-pic">
						`+ getDoms(newRow) +`
					</div>
					
					<div class="singlePro-des">
						<div class="singlePro-des-content">
							`+ newRow.content +`
						</div>
					</div>`
		}else {
			doms = `
					<div class="singlePro-des">
						<div class="singlePro-des-content">
							`+ newRow.content +`
						</div>
					</div>
					<div class="singlePro-pic">
						`+ getDoms(newRow) +`
					</div>`
		}
		return doms;
	}
	// 瀑布流函数
	function waterFlow() {
		$('#main-footer').css('display','block')
		$('.loading_wrapper').css('display','none')
		var arr = [];
		if(isPhones) { 
			$('.box').animate({
				opacity:1
			},600)
		}else {
			for(var i=0;i<$('.box').length;i++) {
				if(i < column) {
					arr[i] = $('.box').eq(i).innerHeight();
				}else {
					var minH = Math.min.apply(null,arr);  // 取最小值
					
					var index = getMinIndex(arr,minH);
					$('.box').eq(i).css({
						'position':'absolute',
						'top': minH + 'px',
						'left': $(".box").eq(index).position().left+'px',
					})
					arr[index]+=$(".box").eq(i).innerHeight();  //将布局好的该div的高度和该div上面的div高度相加，重新放入数组
				}
				$('.box').eq(i).animate({
					opacity:1
				},600)
			}
		}
		var maxH = Math.max.apply(null,arr);  // 取最小值
		$('.private_footer').css({
			'top': maxH +300+ 'px',
			'display':'block'
		})
		
		function getMinIndex(arr,min){       //取得数组中最小高度的div的索引
		   for(var i in arr){
			if(arr[i]==min){
				return i;
			}
		   }
		}
		$('.content_wrapper').find('.box').find('.boximg').unbind("click");  //移除点击事件
		// 图片点击事件
		$('.content_wrapper').find('.box').find('.boximg').click(function(e){
			var id = $(this).attr('data-id'),
				type = $(this).attr('data-type'),
				newRow = {};
				var closePic = require('../img/close.png'),perDoms="";
				for(var b=0;b<allProject.length;b++) {
					if(allProject[b].id === id) {
						newRow = allProject[b];
						break;
					}
				} 
				if(type == 3){  // 图片集
					$('.picProject_wrapper').css('display','block')
					$('.content_wrapper').css('display','none');
					$('.projects_wrapper-tab_container').css('display','none');
					let headDom='',picList=[],picDom='';
					headDom = `<div class="picProject_wrapper-head-left">
									<div class=picProject_wrapper-head-left-title >
										`+ newRow.name +`
									</div>
									<div class=picProject_wrapper-head-left-label >
										`+ newRow.projectlabel +`
									</div>
									<div class=picProject_wrapper-head-left-close><img src=`+ closePic +` ></div>
								</div>
								<div class=picProject_wrapper-head-right>
									`+ newRow.content +`
								</div>`
					$(".picProject_wrapper-head").empty();
					$('.picProject_wrapper-head').append(headDom);  // 赋值
					
					// 图片赋值
					picList = newRow.cover.split(',');
					for(var o=0;o<picList.length;o++) {
						picDom += `<div class=pic_container-item >
										<img src=`+ baseUrl + picList[o] +` >
									</div>`
					}
					$(".pic_container").empty();
					$('.pic_container').append(picDom);  // 赋值
					$("html,body").animate({
					    scrollTop: 0
					}, 0);
					$('.picProject_wrapper').animate({
						left:'0',
						opacity:'1'
					},500,function(){
						$('.picProject_wrapper').find('.picProject_wrapper-head-left-close').unbind("click");
						$('.picProject_wrapper').find('.picProject_wrapper-head-left-close').click(function(){
							$('.projects_wrapper-tab_container').css('display','block');
							$('.picProject_wrapper').animate({
								opacity:0,
								left:'100%'
							},500,function() {
								$('.content_wrapper').css('display','block');
								$('.picProject_wrapper').css('display','none')
							})
						})
					});
				}else {
					$('.singlePro').css('display','block')
					$(".singlePro").empty()
					perDoms = `<div class="singlePro_wrapper">
										<div class="singlePro-top">
											<div class="singlePro-top-left">
												<div class="singlePro-top-left-title">
													`+ newRow.name +`
												</div>
												<div class="singlePro-top-left-label">
													`+ newRow.projectlabel +`
												</div>
											</div>
											<div class="singlePro-top-right">
												<img src=`+ closePic +` >
											</div>
										</div>
										`+ backDom(newRow) +`	
									</div>`
					

					$('.singlePro').append(perDoms);
					if(newRow.type==2) {
						myPlayer = Videojs(document.getElementById('myVideo'), {
							//确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
							controls: true,
							//自动播放属性,muted:静音播放
							autoplay: false,
							//建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
							preload: "auto",
							//设置视频播放器的显示宽度（以像素为单位）
							//width: "auto",
							//设置视频播放器的显示高度（以像素为单位）
							//height: "auto",
							controlBar:{
							  playToggle:true
							} 
						  }); 
					}
					$('.singlePro').animate({
						opacity:1,
						left:0
					},500,function() {
						$('.singlePro').find('.singlePro-top-right').unbind("click");
						$('.singlePro').find('.singlePro-top-right').click(function(){
							if(newRow.type==2) {
								myPlayer.pause();
							}
							$('.singlePro').animate({
								opacity:0,
								left:'2rem'
							},500,function() {
								$('.singlePro').css('display','none')
							})
						})
					})
				}
				
		})
		
	}

	
})


