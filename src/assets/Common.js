/*
 * @Description: 
 * @Version: 1.0
 * @Autor: jinchuan.lee
 * @Date: 2021-09-04 15:27:29
 * @LastEditors: jinchuan.lee
 * @LastEditTime: 2021-09-04 17:49:29
 */
import './js/jquery-1.9.min.js';
import './bootstrap/js/bootstrap.min.js';
import "./bootstrap/css/bootstrap.min.css";
import "./css/cssReset.css"
import './css/app.scss';
import menuLists from "../assets/js/menu.js"
import Request from './js/request.js' 
import { baseUrl } from './js/urlConfig.js'
import { set } from 'lodash';


var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
$(function() {
    var menuList = menuLists;
    // 判断当前设备  移动设备隐藏HOME页
    var hidHome = false;
    if(isPhone) {  // 移动设备
        hidHome = true;
        $('.navbar-nav').height($(window).height())
    }
    var headDom = $('#menu_wrapper .navbar-nav'),listr="";
    for(var i=0;i<menuList.length;i++) {
        if(hidHome && (menuList[i].url).toLowerCase()=='home') {
            
        }else if(hidHome){
            if(menuList[i].isEnable) {
                listr += `<li>
                            <a href=/`+ (menuList[i].url).toLowerCase() +`.html >
                                    
                                    <span>
                                        `+ menuList[i].name +`
                                    </span>
                                    <span>
                                        `+ menuList[i].englishName +`
                                    </span>
                            </a>
                            
                        </li>`
            }
        }else {
            if(menuList[i].isEnable) {
                listr += `<li>
                        <a href=/`+ (menuList[i].url).toLowerCase() +`.html >
                        
                            <span class='cn'>
                                `+ menuList[i].name +`
                            </span>
                            <span class='en'>
                                `+ menuList[i].englishName +`
                            </span>
                                
                        </a>
                        
                    </li>`
            }
        }
        
    }
    headDom.append(listr).find("li").find("a").each(function(){  
        if($($(this))[0].href==String(window.location))  {
            $(this).find('span').addClass('active');  
            $(this).find('.cn').css({
                display:"block"
            });  
            $(this).find('.en').css({
                display:"none"
            });  
        } 
            
        if(isPhone) {  
            $(this).css({
                'width':'100%'
            })
        }else {
            let enW = $(this).find(".en").width();
            let cnW = $(this).find(".cn").width();
            $(this).css({
                'width':enW > cnW?enW:cnW,
            })
        }
    }); 
    $(".wt-logo").click((e)=>{
        if(!isPhone) {
            location.href = "./index.html"
        }
    })
})
$(function() {
    $(window).resize(function () {
        calcW();
    });
    calcW();
    function calcW() {
        var wW = $(window).width();// 当前窗口的宽度
        var whdef = getWindowWidth(wW);// 表示1920的设计图,使用100PX的默认值
        var rem = wW *100/whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
        $('html').css('font-size', rem + "px");
    }
    function getWindowWidth(ww) { 
        let baseWidth = null;
        if(0< ww  && ww<769) { // 移动设备
            baseWidth = 375
        }else if(768< ww && ww <1025) { // ipad
            baseWidth = 1920
        }else if(1024< ww && ww <1500) { // 小屏幕
            baseWidth = 1920
        }else { // 大屏
            baseWidth = 1920
        }
        return baseWidth;
     }
})
window.onresize = function() {
    let isPhones = $(window).width()== 768 || $(window).width()<768; // 移动设备
    if(isPhones !== isPhone) {
        location.reload()
    }
}