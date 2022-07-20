import './index.scss'
import '../../assets/Common.js';
import './index.html';
import Request from '../../assets/js/request.js'
import { imgShow } from '../../assets/js/urlConfig.js'
function getContactInfo() {
    Request('front/findContactUs',{},'POST')
    .then(
        res=>{
            if(res.code == "1") {
                let list = res.data,dataObj = {},leftContent = {};
                if(list.length) {
                    dataObj = list[0];
                    leftContent = JSON.parse(dataObj.leftContent.replace(/&quot;/g,"\""));
                    $(".wt-contact-banner").css({
                        "background-image":`url(`+ imgShow + leftContent.annex +`)`
                    })
                    $(".wt-contact-disc-info1").append(
                        `
                        <div class = "wt-contact-disc-info-i">
                            <span class = "wt-contact-disc-info-i-label size16">重庆纬图</span>
                        </div>
                        <div class = "wt-contact-disc-info-i">
                            <span class = "wt-contact-disc-info-i-label">TEL: </span>
                            <span class = "wt-contact-disc-info-i-value">`+ leftContent.phone +`</span>
                        </div>
                        <div class = "wt-contact-disc-info-i">
                            <span class = "wt-contact-disc-info-i-label">E-MATL: </span>
                            <span class = "wt-contact-disc-info-i-value">`+ leftContent.emile +`</span>
                        </div>
                        <div class = "wt-contact-disc-info-i">
                            <span class = "wt-contact-disc-info-i-label">ADD:</span>
                            <span class = "wt-contact-disc-info-i-value">
                                <a 
                                    href=`+ leftContent.addressUrl +` target="_blank">
                                    `+ leftContent.address +`
                                </a>
                            </span>
                        </div>
                        `
                    )
                    $(".wt-contact-submitType-c").append(
                        `
                            <span>`+ leftContent.type +`</span>
                        `
                    )
                }
                $('#main-footer').css('display','block')
            }
        }
    )
}
function getOptionList() {
    Request('front/findRecruitInfo',{},'POST')
    .then(
        res=>{
            if(res.code == "1") {
                let dataList = res.data; 
                let domStr = "";
                for(var i=0; i<dataList.length;i++) {
                    let textList = dataList[i].requirement.split("；").map(t=>{
                        let _t = $.trim(t);
                        if(_t) {
                            return _t;
                        }
                    });
                    let _textList = textList.filter(i=>i);
                    domStr += 
                    `
                        <div class = "joinUs-position-items">
                        <div class = "joinUs-position-items-title">`+ dataList[i].position +`</div>
                        <div class = "joinUs-position-items-detial">
                    `
                    for(var d=0;d<_textList.length;d++) {
                        domStr += 
                        `
                            <div class = "joinUs-position-items-detial-item">
                                `+ _textList[d] +`；
                            </div>
                        `
                    }
                    domStr += `</div></div>`
                    
                }
                $(".wt-contact-joinUs-position").append(domStr);
            }
        }
    )
}
$(function() {
    getContactInfo();
    getOptionList();
})

