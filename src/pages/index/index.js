import './index.scss'
import '../../assets/Common.js';
import '../../assets/js/prototype.js'
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'
$(function() {
    var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
    if(isPhone) {
        location.href = "./projects.html"
    }else {
        location.href = "./home.html"
    }
})