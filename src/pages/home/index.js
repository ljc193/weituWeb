import './index.scss'
import '../../assets/Common.js';
import '../../assets/js/prototype.js'
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl,imgShow } from '../../assets/js/urlConfig.js'
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
function getImgList() {
    Request('front/findHomePage',{},'POST')
    .then(
        res=>{
            if(res.code == 1) {
                let imgList = [];
                res.data.forEach(i=>{
                    let data = JSON.parse(i.hdescribe.replace(/&quot;/g,"\""));
                    imgList.push({
                        name: i.title,
                        city: data.address,
                        date: data.date,
                        img: imgShow + i.imgAddress
                    })
                })

                let urlDom = ""
                for(var i=0;i<imgList.length;i++) {
                    imgList[i].content = imgList[i].name + " · " + imgList[i].city + " · " + imgList[i].date
                    urlDom += `<li>
                                <a><img src=`  + imgList[i].img + ` /></a>
                                <div class=describe_content>
                                    <span class=describe_content-text >` + imgList[i].content + `</span>
                                </div>
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
                $("#myBanner").myBanner({ showDot: false,scale: false })
                $(".wt-logo").find("img").attr("src", require("../../assets/img/logo.png"));

            }
        }
    )
}
$(function() {
    getImgList();
})
