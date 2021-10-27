import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { imgShow } from '../../assets/js/urlConfig.js'

var isPhone = $(window).width()== 768 || $(window).width()<768; // 移动设备
var params = {
    pageNo:1,
    pageSize: 30,
}
function randerDom(datas,callback) {
    let _peopleList = [],
    str = "",
    len = datas.length,
    n = isPhone?3:6, //每行显示个数
    peopleDom = $(".wt_team-peopleList"),
    lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );

    for (let i = 0; i < lineNum; i++) {
        let temp = datas.slice(i*n, i*n+n);
        _peopleList.push(JSON.parse(JSON.stringify(temp)));
    }
    for(var i = 0;i<_peopleList.length;i++) {
        str += `<div class = "wt_team-peopleList-row">`
        for(var k=0;k<_peopleList[i].length;k++) {
            str += 
            `
            <div class = "wt_team-peopleList-row-col" data-id = `+ _peopleList[i][k].id +`>
                <img src="`+ imgShow +  _peopleList[i][k].imgAddress +`" alt="">
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
            clickItem = datas.find(i=>i.id == clickId); 
        $(".wt_team-peopleList .wt_team-peopleList-row .wt_team-peopleList-row-col").each(function(){
            $(this).find(".wt_team-peopleList-row-col-model").removeClass("click_active");
            if($(this).parent().prev().prop("class") == "wt_team-peopleList-itemDisc") {
                let _this = this;
                if(clickItem.characterDescription) {
                    $(_this).parent().prev().remove();
                }else {
                    $(".wt_team-peopleList-itemDisc").slideUp(300,function() {
                        $(_this).parent().prev().remove();
                    });
                }
                
            }
        })
        
            $(this).find(".wt_team-peopleList-row-col-model").addClass("click_active")
            let disList = clickItem.characterDescription.split("；");
            let disDom = 
            `
            <div class = "wt_team-peopleList-itemDisc">
                <div class = "wt_team-peopleList-itemDisc-wrapper">
                    <div class = "wt_team-peopleList-itemDisc-left">
                        <div class = "wt_team-peopleList-itemDisc-left-name">
                            `+ clickItem.name +`
                        </div>
                        <div class = "wt_team-peopleList-itemDisc-left-disc">
                            `
                            //+ clickItem.characterDescription +
                            for(var i=0;i<disList.length;i++) {
                                disDom += "<div>"+ disList[i] +"</div>"
                            }
                           
                    disDom+= `
                        </div>
                    </div>
                    <div class = "wt_team-peopleList-itemDisc-right">
                        <img src=" `+ imgShow +  clickItem.imgAddress +`" alt="">
                    </div>
                </div>
            </div>
            `
            if(clickItem.characterDescription) {  // 只有老总有详情
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
    $('#main-footer').css('display','block')
    callback && callback();
}
function getMemberList(callback) { 
    Request('front/findTeamIntroduction',params,'POST')
    .then(
        res=>{
            if(res.code == "1") {
                let datas = res.data.list;
                if(!datas.length) return;
                randerDom(datas,callback);
            }
        }
    )
}

$(function() {
    getMemberList(()=>{
        // 滚动监听
        window.onscroll = function() {
            if($(document).scrollTop()+$(window).height()>=$(document).height()){
                params.pageNo += 1;
                getMemberList();
            }  
        }
    });
    
})

