import './index.scss'
import '../../assets/Common.js';
import '../../assets/js/prototype.js'
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'
let imgList = [
    {
        img: require("../../assets/img/home/h_1.jpg"),
        contentOne:"城市的自然生长——成都华润置地未来之城",
        contentTwo:"在这样一片森林城市的空间里，我们试图找回一种人与自然最简单的相处方式。景观设计以自然为基底，引入纯净美、艺术感、未来感的元素，让自然的纯净与未来的张力发生碰撞，形成一处纯美、动感、艺术的活力空间。"
    },
    {
        img: require("../../assets/img/home/h_2.jpg"),
        contentOne:"环球融创滇池南湾未来城·五渔邨小镇",
        contentTwo:"设计尊重场地原有的脉络与肌理，尊重自然馈赠这里的一切，通过深入挖掘云南的民居文化，利用在地的云、石、花、光等自然元素，给予人们一次完美的自然野趣体验。用自然的力量感和文化的在地性，去打造一处沉浸式旅居圣地。" 
    },
    {
        img: require("../../assets/img/home/h_3.gif"),
        contentOne:"环球融创滇池南湾未来城·五渔邨小镇",
        contentTwo:"设计尊重场地原有的脉络与肌理，尊重自然馈赠这里的一切，通过深入挖掘云南的民居文化，利用在地的云、石、花、光等自然元素，给予人们一次完美的自然野趣体验。用自然的力量感和文化的在地性，去打造一处沉浸式旅居圣地。"
    },
    {
        img: require("../../assets/img/home/h_4.jpg"),
        contentOne:"环球融创滇池南湾未来城·五渔邨小镇",
        contentTwo:"设计尊重场地原有的脉络与肌理，尊重自然馈赠这里的一切，通过深入挖掘云南的民居文化，利用在地的云、石、花、光等自然元素，给予人们一次完美的自然野趣体验。用自然的力量感和文化的在地性，去打造一处沉浸式旅居圣地。"
    },
    {
        img: require("../../assets/img/home/h_5.jpg"),
        contentOne:"环球融创滇池南湾未来城·五渔邨小镇",
        contentTwo:"设计尊重场地原有的脉络与肌理，尊重自然馈赠这里的一切，通过深入挖掘云南的民居文化，利用在地的云、石、花、光等自然元素，给予人们一次完美的自然野趣体验。用自然的力量感和文化的在地性，去打造一处沉浸式旅居圣地。"
    },
    {
        img: require("../../assets/img/home/h_6.jpg"),
        contentOne:"环球融创滇池南湾未来城·五渔邨小镇",
        contentTwo:"设计尊重场地原有的脉络与肌理，尊重自然馈赠这里的一切，通过深入挖掘云南的民居文化，利用在地的云、石、花、光等自然元素，给予人们一次完美的自然野趣体验。用自然的力量感和文化的在地性，去打造一处沉浸式旅居圣地。"
    }
]
$(function() {
	Request('/mh/home/list',{},'GET').then(res=>{
		if(res.code==200) {
			let urlDom = ""
			for(var i=0;i<imgList.length;i++) {
				imgList[i].contentOne = imgList[i].contentOne&&imgList[i].contentOne.replace(/(^\s+)|(\s+$)|\s+/g,'<br/>')
				urlDom += `<li>
							<a><img src=`  + imgList[i].img + ` /></a>
							<div class=describe_content>
								<span class=describe_content-text >` + imgList[i].contentOne +`</span>
								<span class=describe_content-title >`+ imgList[i].contentTwo +`</span>
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
		}
	})
     $(".wt-logo").find("img").attr("src", require("../../assets/img/logo.png"));
})
