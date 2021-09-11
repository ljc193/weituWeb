import './index.scss'
import '../../assets/Common.js';
import '../../assets/js/prototype.js'
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'
let imgList = [
    {
        img: require("../../assets/img/qs0.jpg"),
        contentOne:"这也太好看了吧",
        contentTwo:"秦时明月官方图片秦时明月官方月官方图片秦时明月官方秦时明月官方图片秦时明月官方图片"
    },
    {
        img:require("../../assets/img/qs1.jpg"),
        contentOne:"这也太好看了吧",
        contentTwo:"秦时明月官方图片"
    },
    {
        img:require("../../assets/img/qs2.jpg"),
        contentOne:"这也太好看了吧",
        contentTwo:"秦时明月官方图片"
    },
    {
        img:require("../../assets/img/qs3.jpg"),
        contentOne:"这也太好看了吧",
        contentTwo:"秦时明月官方图片"
    },
    {
        img:require("../../assets/img/qs4.jpg"),
        contentOne:"这也太好看了吧",
        contentTwo:"秦时明月官方图片"
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
