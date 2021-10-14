import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { imgShow } from '../../assets/js/urlConfig.js'
var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
var params = {
    pageNo:1,
    pageSize: 5,
}
function getNews(callback) {
    Request('front/findJournalism',params,'POST')
    .then(
        res=>{
            if(res.code == "1") {
                let newsList = res.data.list;
                if(!newsList.length) return;
                let containerDom = $(".wt_news");
                let str = "";
                for(var i=0;i<newsList.length;i++) {
                    let content = JSON.parse(newsList[i].content.replace(/&quot;/g,"\""));
                    str += `
                            <div class = "wt_news-items">
                                <img src="`+ imgShow + newsList[i].cover +`" alt="" class = "wt_news-items-bg">
                                <div class = "wt_news-items-model"></div>
                                <div class = "wt_news-items-ctx">
                                    <div class = "wt_news-items-ctx-title">
                                        `+ newsList[i].title +`
                                    </div>
                                    <div class = "wt_news-items-ctx-date">
                                        `+ new Date(newsList[i].issueTime).format("yyyy年MM月dd日") +`
                                    </div>
                                    <div class = "new_slider">
                                        <div class = "wt_news-items-ctx-cn">
                                            `+ content.contentCn +`
                                        </div>
                                        <div class = "wt_news-items-ctx-en">
                                            `+ content.contentEn +`
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                }
                containerDom.append(str);
                if(!isPhone) {
                    $(".wt_news-items").find(".new_slider").slideUp(0) /* 非移动端新闻介绍默认隐藏 */
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
                callback && callback();
            }
        }
    )
}
$(function() {
    getNews(()=>{
        // 滚动监听
        window.onscroll = function() {
            if($(document).scrollTop()+$(window).height()>=$(document).height()){
                params.pageNo += 1;
                getNews();
            }  
        }
    });
})
