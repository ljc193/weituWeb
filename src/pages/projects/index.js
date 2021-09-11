import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'
var typeList = [
    "住宅景观",
    "公共空间",
    "文旅度假",
    "城市更新",
    "商业办公",
    "酒店度假",
]
$(function() {
    let labelDom = $(".wt_projects").find(".wt_projects-wrapper").find(".wt_projects-wrapper-item");
    labelDom.eq(0).addClass("label_active")
    labelDom.on("click",function() {
        labelDom.removeClass("label_active")
        $(this).addClass("label_active");
    })
})