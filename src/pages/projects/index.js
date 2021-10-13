import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl,imgShow } from '../../assets/js/urlConfig.js'
import '../../assets/js/prototype.js'


var typeList = [
    "住宅景观",
    "公共空间",
    "文旅度假",
    "城市更新",
    "商业办公",
    "酒店度假",
]
var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
var params = {
    pageNo:1,
    pageSize: 12,
    itemCategoryId:""
}
// 获取类型
function getType() {
    Request('front/findItemCategory',{},'POST')
    .then(
        res=>{
            if(res.code == 1) {
                let data = res.data,
                    parentDom = $(".wt_projects-type"),
                    str = "";
                for(var i=0;i<data.length;i++) {
                    str += 
                    `
                    <div class = "wt_projects-type-item" data-id = `+ data[i].id +`>
                        <span class = "cn">`+ data[i].name +`</span>
                        <span class = "en">`+ data[i].englishName +`</span>
                    </div>
                    `
                }
                parentDom.append(str);
                params.itemCategoryId = data[0].id;
                getItem(params);
                 /* 大类型点击 */
                let labelDom = $(".wt_projects").find(".wt_projects-type").find(".wt_projects-type-item");
                labelDom.eq(0).addClass("label_active");
                labelDom.on("click",function() {
                    labelDom.removeClass("label_active")
                    $(this).addClass("label_active");
                    let id = $(this).attr('data-id');
                    params.id = id;
                    $(".wt_projects-content-wrapper").empty();
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
function getItem(params) {
    Request('front/findIntroduction',params,'POST')
    .then(
        res=>{
            if(res.code == 1) {
                let data = res.data.list,
                    parentDom = $(".wt_projects-content-wrapper"),
                    str = "";
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
                    cancalDetail();
                    parentDom.append(str);
                    imgMounted();
                    //bannerInt();
            }
        }
    )
}
function imgMounted() {
    /* 项目图片点击 */
    $(".item_wrapper").on('click',function(e) {
        let itemId = $(this).attr("data-id");
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
                                    <div class = "content_items-value">`+ contentData.titles +`y</div>
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
                        var count = 1;
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
                        $(".itemDetail_content_back").on("click",function() {
                            cancalDetail();
                        })
                }
            }
        )
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
}
function bannerInt() {
    let imgList = [
        {
            img: require("../../assets/img/home/h_1.jpg"),
            name:"华润置地未来之城",
            city:"成都",
            date:"2020"
        },
        {
            img: require("../../assets/img/home/h_2.jpg"),
            name:"环球融创滇池南湾未来城",
            city:"五渔邨小镇",
            date:"2020"
        },
        {
            img: require("../../assets/img/home/h_3.gif"),
            name:"环球融创滇池南湾未来城",
            city:"五渔邨小镇",
            date:"2020"
        },{
            img: require("../../assets/img/home/h_4.jpg"),
            name:"环球融创滇池南湾未来城",
            city:"五渔邨小镇",
            date:"2020"
        },
        {
            img: require("../../assets/img/home/h_5.jpg"),
            name:"环球融创滇池南湾未来城",
            city:"五渔邨小镇",
            date:"2020"
        },
        {
            img: require("../../assets/img/home/h_6.jpg"),
            name:"环球融创滇池南湾未来城",
            city:"五渔邨小镇",
            date:"2020"
        }
    ]
    let urlDom = ""
    for(var i=0;i<imgList.length;i++) {
        imgList[i].content = imgList[i].name + " · " + imgList[i].city + " · " + imgList[i].date
        urlDom += `<li>
                    <a><img src=`  + imgList[i].img + ` /></a>
                </li>`
    }
    $("#myBanner ul").append(urlDom);
    $("#myBanner ul").find('li').find('img').each((i,d)=>{
        if($(d).height()<$(window).height()) { // 图片比例不对
            $(d).css({
                'width':"auto",
                'min-width':'100%',
                'height':'100%'
            })
        }
    })
    $("#myBanner").myBanner({ showDot: false,scale: false,isAuto:false })
}
$(function() {
    getType();
    
})