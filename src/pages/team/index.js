import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { baseUrl } from '../../assets/js/urlConfig.js'

var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
$(function() {
    var peopleList = [
        {
            url: require("../../assets/img/team/gao.png"),
            name:"高静华",
            index:1,
            position:"创始合伙人",
            dis:"纬图设计机构创始合伙人、总裁，注册城市规划师。从事规划及景观设计行业工作近二十年，拥有丰富的项目管理和设计公司管理经验，带领团队从西南走向全国，纬图作品遍布全国各地，涉及旅游度假区、城市开放空间、居住区等，并多次荣获各类奖项。"
        },
        {
            url: require("../../assets/img/team/li.png"),
            name:"李卉",
            index:2,
            position:"合伙人",
            dis:"纬图景观合伙人 设计总监  注册城市规划师。2003年获重庆大学建筑城规学院硕士学位，在读博士研究生。11年来的设计经验，李卉关注人•景•地三者之间的内在逻辑，尊重自然、尊重这片土地及在此生活的人，承担景观的使命—疗愈土地，疗愈人，疗愈土地。在纬图的作品里，你总能感受到设计所传递的善意与爱。"
        }
    ]
    var _peopleList = []
    for(var i = 2;i<50;i++) {
        peopleList.push({
            url: require("../../assets/img/team/example.png"),
            name:"示例" + (i+1),
            index:i+1,
            position:"团队成员",
            dis:"此处为成员介绍···"
        })
    }
    let len = peopleList.length;
    let n = isPhone?3:6; //每行显示个数
    let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
    for (let i = 0; i < lineNum; i++) {
        let temp = peopleList.slice(i*n, i*n+n);
        _peopleList.push(JSON.parse(JSON.stringify(temp)));
    }
    let peopleDom = $(".wt_team-peopleList");
    let str = "";
    for(var i = 0;i<_peopleList.length;i++) {
        str += `<div class = "wt_team-peopleList-row">`
        for(var k=0;k<_peopleList[i].length;k++) {
            str += 
            `
            <div class = "wt_team-peopleList-row-col" data-id = `+ _peopleList[i][k].index +`>
                <img src="`+ _peopleList[i][k].url +`" alt="">
                <div class = "wt_team-peopleList-row-col-model">
                    <div class = "flexWrapper" >
                        <span class = "wt_team-peopleList-row-col-model-name">`+ _peopleList[i][k].name +`</span>
                        <span class = "wt_team-peopleList-row-col-model-position">`+ _peopleList[i][k].position +`</span>
                    </div>
                </div>
            </div>
            `
        }
        str += `</div>`
    }
    peopleDom.append(str).find(".wt_team-peopleList-row .wt_team-peopleList-row-col").on('click',function() {
        let isNotSlide = $(this).parent().prev().prop("class") == "wt_team-peopleList-itemDisc";
        let clickId = $(this).attr('data-id'),
            parentDom = $(this).parent(),
            clickItem = peopleList[clickId-1]; 
        $(".wt_team-peopleList .wt_team-peopleList-row .wt_team-peopleList-row-col").each(function(){
            $(this).find(".wt_team-peopleList-row-col-model").removeClass("click_active");
            if($(this).parent().prev().prop("class") == "wt_team-peopleList-itemDisc") {
                let _this = this;
                if(clickId == 1 || clickId == 2) {
                    $(_this).parent().prev().remove();
                }else {
                    $(".wt_team-peopleList-itemDisc").slideUp(300,function() {
                        $(_this).parent().prev().remove();
                    });
                }
                
            }
        })
        // $(".wt_team-peopleList .wt_team-peopleList-row").each(function(){
            
        // })
        
        
            $(this).find(".wt_team-peopleList-row-col-model").addClass("click_active")
            let disDom = 
            `
            <div class = "wt_team-peopleList-itemDisc">
                <div class = "wt_team-peopleList-itemDisc-wrapper">
                    <div class = "wt_team-peopleList-itemDisc-left">
                        <div class = "wt_team-peopleList-itemDisc-left-name">
                            `+ clickItem.name +`
                        </div>
                        <div class = "wt_team-peopleList-itemDisc-left-disc">
                            `+ clickItem.dis +`
                        </div>
                    </div>
                    <div class = "wt_team-peopleList-itemDisc-right">
                        <img src=" `+ clickItem.url +`" alt="">
                    </div>
                </div>
            </div>
            `
            if(clickId == "1" || clickId == "2") {  // 只有老总有详情
                parentDom.before(disDom);
            }
            
            if(!isNotSlide) {
                $(".wt_team-peopleList-itemDisc").slideDown(300,function() {

                });
            }else {
                $(".wt_team-peopleList-itemDisc").css({
                    display:"block"
                })
            }
    });
})

