import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'

import "./banner/css/style.scss"
import "./banner/js/carousel.js"


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
    let labelDom = $(".wt_projects").find(".wt_projects-type").find(".wt_projects-type-item");
    labelDom.eq(0).addClass("label_active")
    labelDom.on("click",function() {
        labelDom.removeClass("label_active")
        $(this).addClass("label_active");
    })
    $(".item_wrapper").on('click',function(e) {
        $(".wt_projects-content-wrapper").css({ display:"none" });
        $(".wt_projects-itemDetail").css({ display:"block" });
        $(".wt_projects-selectType").css({ display:"none" });
        $(window).scrollTop(0)
    })
    /* 取消详情 */
    $(".wt_projects-itemDetail-close").on("click",function() {
        $(".wt_projects-content-wrapper").css({ display:"flex" });
        $(".wt_projects-itemDetail").css({ display:"none" });
        if(isPhone) {
            $(".wt_projects-selectType").css({ display:"block" });
        }
        $(window).scrollTop(0)
    })
})
$(function(){
	$(".banner").thumbnailImg({
		large_elem: ".large_box",
		small_elem: ".small_list",
		left_btn: ".left_btn",
		right_btn: ".right_btn"
	});
});