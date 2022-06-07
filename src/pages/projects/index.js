import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl,imgShow } from '../../assets/js/urlConfig.js'
import '../../assets/js/prototype.js'



var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
var params = {
    pageNo:1,
    pageSize: 10,
    itemCategoryId:""
}
var count = 1;
// 获取类型
function getType(callback) {
    Request('front/findItemCategory',{},'POST')
    .then(
        res=>{
            if(res.code == 1) {
                let data = res.data,
                    parentDom = $(".wt_projects-type"),
                    selectDom = $(".form-control"),
                    selectStr = "",
                    str = "";
                for(var i=0;i<data.length;i++) {
                    selectStr += 
                    `
                        <option data-id = `+ data[i].id +`>`+ data[i].name +`</option>
                    `
                    str += 
                    `
                    <div class = "wt_projects-type-item" data-id = `+ data[i].id +`>
                        <span class = "cn">`+ data[i].name +`</span>
                        <span class = "en">`+ data[i].englishName +`</span>
                    </div>
                    `
                }
                parentDom.append(str);
                selectDom.append(selectStr);
                params.itemCategoryId = data[0].id;
                getItem(params,callback);
                 /* 大类型点击 */
                let labelDom = $(".wt_projects").find(".wt_projects-type").find(".wt_projects-type-item");
                labelDom.eq(0).addClass("label_active");
                selectDom.on("change",function(){
                    params.pageNo = 1; // 重置页数
                    let id = $(this).children('option:selected').attr('data-id');
                    params.itemCategoryId = id;
                    $(".wt_projects-content-wrapper").empty();
                    getItem(params);
                })
                labelDom.on("click",function() {
                    params.pageNo = 1; // 重置页数
                    labelDom.removeClass("label_active")
                    $(this).addClass("label_active");
                    let id = $(this).attr('data-id');
                    params.itemCategoryId = id;
                    $(".wt_projects-content-wrapper").empty();
                    $('#main-footer').css('display','none')
                    getItem(params);
                })
                labelDom.each(function(i,d) {
                    let enW = $(this).find(".en").width() + 5;
                    let cnW = $(this).find(".cn").width() + 5;
                    $(this).css({
                        'width':enW > cnW?enW:cnW,
                    })
                })
            }
        }
    )
}

// 获取项目
function getItem(params,callback) {
    Request('front/findIntroduction',params,'POST')
    .then(
        res=>{
            if(res.code == 1) {
                let data = res.data.list,
                    parentDom = $(".wt_projects-content-wrapper"),
                    str = "";
                    if(!data.length && params.pageNo <2) {
                        str = 
                        `
                            <div class = "noData">暂无数据</div>
                        `
                        parentDom.append(str);
                        callback && callback();
                        return;
                    }
                    for(var i=0;i<data.length;i++) {
                        str += 
                        `
                        <div class = "wt_projects-content-wrapper-item">
							<div class = "item_wrapper" data-id=`+ data[i].id +`>
								<img src="`+ imgShow + data[i].cover +`" alt="">
								<div class = "item_model">
									<div class="item_model-content">
										<div class="item_model-content-name">`+ data[i].name +`</div>
										<div class="item_model-content-date">`+ data[i].content +`</div>
									</div>
								</div>
							</div>
						</div>
                        `
                    }
                    if(params.pageNo <2) cancalDetail();
                    parentDom.append(str);
                    imgMounted();
                    $('#main-footer').css('display','block')
                    callback && callback();

                    watchUrl();
            }
        }
    )
}
function watchUrl() {
    let itemId = GetQueryValue('id')
    if(itemId) {
        $(".wt_projects-content-wrapper").css({ display:"none" }); 
        Request('front/findProject',{id:itemId},'POST')
        .then(
            res=>{
                if(res.code == 1) {
                    let datas = res.data,
                        bannerList = datas.annex.split(",").map(i=>(imgShow+i)),
                        contentData = JSON.parse(datas.leftContent.replace(/&quot;/g,"\"")),
                        domStr = "",
                        imgStr = "";
                        // 赋值轮播
                        for(var i=0;i<bannerList.length;i++) {
                            imgStr += `<li>
                                        <a><img src=`  + bannerList[i] + ` /></a>
                                    </li>`
                        }
                        $("#myBanner ul").append(imgStr);
                        $("#myBanner ul").find('li').find('img').each((i,d)=>{
                            if($(d).height()<$(window).height()) { // 图片比例不对
                                $(d).css({
                                    'width':"auto",
                                    'min-width':'100%',
                                    'height':'100%'
                                })
                            }
                        })
                        $("#myBanner").myBanner({ showDot: false,scale: false,isAuto:false });
                        // 赋值内容
                        domStr = 
                        `
                            <div class = "itemDetail_content-left">
                                <div class = "itemDetail_content-left-title">`+ contentData.title +`</div>
                                <div class = "content-row">
                                    <div class = "content_items">
                                        <div class = "content_items-label">项目名称:</div>
                                        <div class = "content_items-value">`+ contentData.title +`</div>
                                    </div>
                                    <div class = "content_items">
                                        <div class = "content_items-label">景观面积:</div>
                                        <div class = "content_items-value">`+ contentData.area +`</div>
                                    </div>
                                </div>
                                <div class = "content-row">
                                    <div class = "content_items">
                                        <div class = "content_items-label">项目地址:</div>
                                        <div class = "content_items-value">`+ contentData.address +`</div>
                                    </div>
                                    <div class = "content_items">
                                        <div class = "content_items-label">建成时间:</div>
                                        <div class = "content_items-value">`+ contentData.date +`</div>
                                    </div>
                                </div>
                            </div>
                            <div class = "itemDetail_content-right">
                                <div class = "content_items">
                                    <div class = "content_items-label">Project Name:</div>
                                    <div class = "content_items-value">`+ contentData.titles +`</div>
                                </div>
                                <div class = "content_items">
                                    <div class = "content_items-label">Tongyuan area:</div>
                                    <div class = "content_items-value">`+ contentData.area +`</div>
                                </div>
                                <div class = "content_items">
                                    <div class = "content_items-label">Project address:</div>
                                    <div class = "content_items-value">`+ contentData.addresss +`</div>
                                </div>
                                <div class = "content_items">
                                    <div class = "content_items-label">Production time:</div>
                                    <div class = "content_items-value">`+ contentData.dates +`</div>
                                </div>
                            </div>
                        `
                        $(".itemDetail_content").append(domStr);
                        $(".wt_projects-itemDetail").css({ display:"block" });
                        $(".wt_projects-selectType").css({ display:"none" });
                        $("#menu_wrapper").addClass("nav_transparent");
                        $(".wt_projects-type-item").addClass("type_itemWhite");
                        $(".wt-logo").find("img").attr("src", require("../../assets/img/logo.png"));
                        $(".itemDetail_content_wrapper").slideUp(0); // 默认收起
                        $(".itemDetail_content_slider").find(".img-icon").css({
                            transform: "rotate(90deg)"
                        })
                        $("#menu_wrapper").css({
                            background: "transparent"
                        })
                        /* 详情内容收起按钮点击 */
                        $(".itemDetail_content_wrapper").stop(true,true).slideUp(0);
                        $(".itemDetail_content_slider").unbind("click");
                        $(".itemDetail_content_slider").on("click",function() {
                            if(count == 1) {
                                $(this).find(".img-icon").css({
                                    transform: "rotate(-90deg)"
                                })
                                $(".itemDetail_content_back").show();
                                $(".itemDetail_content_wrapper").stop(true,true).slideDown(300,()=>{

                                })
                                
                                count = 2;
                            }else {
                                $(this).find(".img-icon").css({
                                    transform: "rotate(90deg)"
                                })
                                $(".itemDetail_content_back").hide();
                                $(".itemDetail_content_wrapper").stop(true,true).slideUp(300,()=>{
                                    
                                })
                                count = 1;
                            }
                            
                        })
                        $(".itemDetail_content_back").unbind("click");
                        $(".itemDetail_content_back").on("click",function() {
                            // cancalDetail();
                            open(`./projects.html`,'_self')
                        })
                }
                $('#main-footer').css('display','none')
                $('html').css('height','auto')
            }
        )
    }
}
function GetQueryValue(queryName) {
        var query = decodeURI(window.location.search.substring(1));
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == queryName) { return pair[1]; }
        }
        return null;
 }
function imgMounted() {
    /* 项目图片点击 */
    $(".item_wrapper").unbind("click");
    $(".item_wrapper").on('click',function(e) {
        let itemId = $(this).attr("data-id");
        open(`./projects.html?id=${itemId}`,'_self')
    })
}
/* 取消详情 */
function cancalDetail() {
    $(".wt_projects-content-wrapper").css({ display:"flex" });
    $(".wt_projects-itemDetail").css({ display:"none" });
    $(".itemDetail_content").empty();
    $("#myBanner ul").empty();
    if(isPhone) {
        $(".wt_projects-selectType").css({ display:"block" });
    }
    //$(window).scrollTop(0)
    $("#menu_wrapper").removeClass("nav_transparent");
    $(".wt_projects-type-item").removeClass("type_itemWhite");
    $(".wt-logo").find("img").attr("src", require("../../assets/img/logo1.png"));
    $("#menu_wrapper").css({
        background: "#fff"
    })
    $('html').css('height','100%')
}
$(function() {
    getType(()=>{
        // 滚动监听
        window.onscroll = function() {
            if($(document).scrollTop()+$(window).height()>=$(document).height()){
                params.pageNo += 1;
                getItem(params);
            }  
        }
    });
})