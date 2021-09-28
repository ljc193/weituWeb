import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'
$(function() {
    var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
    let containerDom = $(".wt_news");
    let str = "";
    for(var i = 0;i<10;i++) {
        str += `
            <div class = "wt_news-items">
                <img src="`+ require("../../assets/img/banner.png") +`" alt="" class = "wt_news-items-bg">
                <div class = "wt_news-items-model"></div>
                <div class = "wt_news-items-ctx">
                    <div class = "wt_news-items-ctx-title">
                        新闻及动态标题
                    </div>
                    <div class = "wt_news-items-ctx-date">
                        2021年5月7日
                    </div>
                    <div class = "new_slider">
                        <div class = "wt_news-items-ctx-cn">
                        字数限制为150字约为两排。字数限制为150字约为两排。字数限制为150字约为两排。字数限制为150字约为两排。
                        字数限制为150字约为两排。字数限制为150字约为两排。字数限制为110字。字数限制为110字。
                        字数限制为110字。字数限制为110字。字数限制为110字。字数限制为110字。字数限制为110字。
                        </div>
                        <div class = "wt_news-items-ctx-en">
                        Caoshan is selected as the site, and Global Finance Creative Map is here to build a 14,000-acre s
                        uper futuristic resort city suspended above mountains, lakes, valleys, forests and islands, Caoshan Future City.
                        Caoshan is selected as the site, and Global Finance Creative Map is here to build a 14,000-acre s
                        uper futuristic resort city suspended above mountains.
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    containerDom.append(str);

    
    if(!isPhone) {
        $(this).find(".new_slider").slideUp(0) /* 非移动端新闻介绍默认隐藏 */
        $(".wt_news-items").on("mouseenter",function(){
            $(this).find(".wt_news-items-model").css({
                background: "rgba(0,0,0,0.7)"
            })
            $(this).find(".wt_news-items-bg").css({
                filter: "blur(5px)",
            })
            $(this).find(".new_slider").slideDown(300)
        })
        $(".wt_news-items").on("mouseleave",function(){
            $(this).find(".wt_news-items-model").css({
                background: "rgba(0,0,0,0.5)"
            })
            $(this).find(".wt_news-items-bg").css({
                filter: "blur(0px)",
            })
            $(this).find(".new_slider").slideUp(300)
        })
    }else {
        $(this).find(".wt_news-items-model").css({
            background: "rgba(0,0,0,0.7)"
        })
        $(this).find(".wt_news-items-bg").css({
            filter: "blur(5px)",
        })
    }
    
})
