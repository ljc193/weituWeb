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
                let list = res.data,dataObj = {},rightContent = {};
                if(list.length) {
                    dataObj = list[0];
                    rightContent = JSON.parse(dataObj.rightContent.replace(/&quot;/g,"\""));
                    $(".wt-contact-banner").css({
                        "background-image":`url(`+ imgShow + rightContent.banner +`)`
                    })
                    $(".wt-contact-disc-info-cn").append(rightContent.disCn);
                    $(".wt-contact-disc-info-en").append(rightContent.disEn);
                }
                $('#main-footer').css('display','block')
            }
        }
    )
    
}
$(function() {
    getContactInfo();
})

