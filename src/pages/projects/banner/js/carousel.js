(function($){
    var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
    //默认参数
    var defaluts = {
        large_elem: ".large_elem",   //大图根元素
        small_elem: ".small_elem",   //小图根元素
        left_btn: ".left_btn",       //小图切换左按钮
        right_btn: ".right_btn" ,    //小图切换右按钮
        state: "on",                 //小图当前项类
        speed: "normal",             //小图移动速度
        vis: isPhone?5:10,                      //小图数量
        autoplay: true,              //是否自动播放
        autotime: 3000               //自动播放时间
    };
    $.fn.extend({
        /* 带缩略图的轮播效果 */
        "thumbnailImg": function (options) {
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数
            //遍历匹配元素的集合
            return this.each(function () {
                var $this = $(this);
                var t = 0;
                /* 初始化 */
                $(opts.large_elem).find("ul li").eq(0).show();
                $(opts.small_elem).find("ul li").eq(0).addClass(opts.state);
                var l = $(opts.small_elem).find("ul li").length;
                var l_mean;
                if(l < opts.vis){
                    l_mean = 0;
                }else{
                    l_mean = ((parseInt(l / opts.vis) - 1) * opts.vis) + (l % opts.vis);
                }
                var w = $(opts.small_elem).find("ul li").outerWidth(true);  //缩略图项的宽度（包含内边距）
                $(opts.small_elem).find("ul").css("width",l * w + "px");    //初始化缩略图总宽度
                /* 缩略图点击 */
                $(opts.small_elem).find("ul li").click(function(){
                    $(this).addClass(opts.state).siblings().removeClass(opts.state);
                    t = $(this).index();
                    Img($(this).index());
                });
                /* 左按钮 */
                $(opts.left_btn).click(function(){
                    var i;
                    $(opts.small_elem).find("ul li").each(function(index){
                        if($(this).hasClass(opts.state)){
                            i = index;
                        }
                    });
                    i--;
                    if(i < 0){
                        i = l - 1;
                    }
                    $(opts.small_elem).find("ul li").eq(i).addClass(opts.state).siblings().removeClass(opts.state);
                    var ml = i * w;
                    if(ml <= l_mean * w){
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -ml + "px"
                        },opts.speed)
                    }else{
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -(l_mean * w) + "px"
                        },opts.speed)
                    }
                    t = i;
                    Img(i)
                });
                /* 右按钮 */
                $(opts.right_btn).click(function(){
                    var i;
                    $(opts.small_elem).find("ul li").each(function(index){
                        if($(this).hasClass(opts.state)){
                            i = index;
                        }
                    });
                    i++;
                    if(i > l-1){
                        i = 0;
                    }
                    $(opts.small_elem).find("ul li").eq(i).addClass(opts.state).siblings().removeClass(opts.state);
                    var ml = i * w;
                    if(ml <= l_mean * w){
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -ml + "px"
                        },opts.speed)
                    }else{
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -(l_mean * w) + "px"
                        },opts.speed)
                    }
                    t = i;
                    Img(i);
                });
                /* 大图 */
                function Img(i){
                    $(opts.large_elem).find("ul li").eq(i).fadeIn().siblings().hide();
                    $(opts.small_elem).find("ul li").eq(i).addClass(opts.state).siblings().removeClass(opts.state);
                    var ml = i * w;
                    if (ml <= l_mean * w) {
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -ml + "px"
                        }, opts.speed)
                    } else {
                        $(opts.small_elem).find("ul").stop().animate({
                            marginLeft: -(l_mean * w) + "px"
                        }, opts.speed)
                    }
                }
                /* 自动播放 */
                if(opts.autoplay) {
                    var timing = setInterval(function () {
                        t++;
                        if (t > l - 1) {
                            t = 0
                        }
                        Img(t)
                    }, opts.autotime);
                    $this.hover(function () {
                        clearInterval(timing)
                    }, function () {
                        timing = setInterval(function () {
                            t++;
                            if (t > l - 1) {
                                t = 0
                            }
                            Img(t)
                        }, opts.autotime)
                    })
                }
            });
        }
    });
})(jQuery);