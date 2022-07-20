import { baseUrl } from './urlConfig.js'
let baseUrls = ""
if (process.env.NODE_ENV === "development") {
	baseUrls = "/api/"
  }else {
	baseUrls = baseUrl
  }
baseUrls = baseUrl
function Request(url,data,method) {
	return new Promise((resolve,reject)=>{
		$.ajax({
			type: method,
			url:baseUrls + url,
			data:data,
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			success:function (data) {
				resolve(data)
			},
			error:function(e) {
				throw new Error('未连接到网络！！！')
				reject(e)
			}
		});
	})
}

export default Request;