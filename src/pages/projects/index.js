import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'
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
$(function() {
    /* 大类型点击 */
    let labelDom = $(".wt_projects").find(".wt_projects-type").find(".wt_projects-type-item");
    labelDom.eq(0).addClass("label_active");
    // labelDom.eq(0).find('.cn').css({
    //     display:"block"
    // });  
    // labelDom.eq(0).find('.en').css({
    //     display:"none"
    // });  
    labelDom.on("click",function() {
        labelDom.removeClass("label_active")
        $(this).addClass("label_active");
       
    })
    labelDom.each(function(i,d) {
        let enW = $(this).find(".en").width() + 5;
        let cnW = $(this).find(".cn").width() + 5;
        $(this).css({
            'width':enW > cnW?enW:cnW,
        })
    })
    /* 项目图片点击 */
    $(".item_wrapper").on('click',function(e) {
        $(".wt_projects-content-wrapper").css({ display:"none" });
        $(".wt_projects-itemDetail").css({ display:"block" });
        $(".wt_projects-selectType").css({ display:"none" });
        //$(window).scrollTop(0)
        $("#menu_wrapper").addClass("nav_transparent");
        $(".wt_projects-type-item").addClass("type_itemWhite");
        $(".wt-logo").find("img").attr("src", require("../../assets/img/logo.png"));
        $(".itemDetail_content_wrapper").slideUp(0); // 默认收起
        $(".itemDetail_content_slider").find(".img-icon").css({
            transform: "rotate(90deg)"
        })
    })
    /* 取消详情 */
    $(".itemDetail_content_back").on("click",function() {
        $(".wt_projects-content-wrapper").css({ display:"flex" });
        $(".wt_projects-itemDetail").css({ display:"none" });
        if(isPhone) {
            $(".wt_projects-selectType").css({ display:"block" });
        }
        //$(window).scrollTop(0)
        $("#menu_wrapper").removeClass("nav_transparent");
        $(".wt_projects-type-item").removeClass("type_itemWhite");
        $(".wt-logo").find("img").attr("src", require("../../assets/img/logo1.png"));
    })
    /* 详情内容收起按钮点击 */
    var count = 1;
    $(".itemDetail_content_wrapper").slideUp(0); // 默认收起
    $(".itemDetail_content_slider").on("click",function() {
        if(count == 1) {
            $(this).find(".img-icon").css({
                transform: "rotate(-90deg)"
            })
            $(".itemDetail_content_back").show();
            $(".itemDetail_content_wrapper").slideDown(300,()=>{

            })
            
            count = 2;
        }else {
            $(this).find(".img-icon").css({
                transform: "rotate(90deg)"
            })
            $(".itemDetail_content_back").hide();
            $(".itemDetail_content_wrapper").slideUp(300,()=>{
                
            })
            count = 1;
        }
        
    })

})
$(function(){
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
    $(function() {
        Request('/mh/home/list',{},'GET').then(res=>{
            if(res.code==200) {
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
        })
    })
    
});