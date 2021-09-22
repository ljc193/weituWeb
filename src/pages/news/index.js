import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'
$(function() {
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
                    <div class = "wt_news-items-ctx-cn">
                        选址曹山，环球融创意图在这里建造一座悬浮于山、湖、谷、森林、岛屿之上的14000亩超级未来度假城市，曹山未来城。
                    </div>
                    <div class = "wt_news-items-ctx-en">
                        Caoshan is selected as the site, and Global Finance Creative Map is here to build a 14,000-acre super 
                        futuristic resort city suspended above mountains, 
                        lakes, valleys, forests and islands, Caoshan Future City.
                    </div>
                </div>
            </div>
        `
    }
    containerDom.append(str)
})
