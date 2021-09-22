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
                <div class = "wt_news-items row">
                <div class = "col-lg-5 col-md-6 col-sm-6 col-xs-12 wt_news-items-leftImg">
                    <img src="` + require("../../assets/img/new/n_1.jpg") + `" alt="">
                </div>
                <div class = "col-lg-7 col-md-6 col-sm-6 col-xs-12">
                    <div class = "wt_news-items-rightDis">
                        <div class = "wt_news-items-rightDis-title">抚仙湖畔的欢乐山谷</div>
                        <div class = "wt_news-items-rightDis-date">2021年9月7日</div>
                        <div class = "wt_news-items-rightDis-content">
                            <p>
                                云南抚仙湖东北岸的寒武纪小镇是一个以寒武文化为核心，
                                集化石博物馆、动物大世界、海洋大世界、湿地公园、度假小镇、高端酒店群、半山度假区于一体的综合性文化旅游项目。经过6年的建设，
                                如今的寒武纪小镇已经成为抚仙湖畔的欢乐王国。
                            </p>
                            <p>
                                小镇的售楼部于2015年开始建设，2017年投入使用。原有售楼部只包含一处类三角形建筑与室外停车场，看房路线单一，
                                客户需要在售楼部对项目进行了解之后再坐观光车前往各个组团参观，
                                组团之间未设置步行通道只能车行，交通动线匮乏。业主方希望对售房部及周边区域景观进行整体提升，
                                营造出更符合项目气质的欢乐综合体验的同时，也能用景观串联起售楼部与其他区域的联系，形成一条湖岸边可参观可游玩的景观步道。
                            </p>

                            <p>
                                The Cambrian town on the Northeast Bank of Fuxian Lake in Yunnan Province is a comprehensive cultural tourism p
                                roject with Cambrian culture as the core and integrating Fossil Museum, animal world, ocean world, wetland park, 
                                resort town, high-end hotel group and mid mountain resort. After six years of construction, today's Cambrian town has 
                                become a happy kingdom by the Fuxian Lake.
                            </p>
                            <p>
                                The Sales Department of the town was constructed in 2015 and put into use in 2017. 
                                The original sales department only includes a triangular building and an outdoor parking lot. The viewing route is 
                                single. Customers need to take a light car to visit each group after the Sales Department understands the project. 
                                There is no walking channel between the groups, only cars can travel, and the traffic lines are scarce. The owner hopes 
                                to improve the overall landscape of the sales department and surrounding areas, create a happy comprehensive experience 
                                more in line with the temperament of the project, and connect the sales department with other areas with the landscape to form a 
                                landscape trail that can be visited and played by the lake bank.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "line"></div>
        `
    }
    containerDom.append(str)
})
