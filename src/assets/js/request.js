// import { baseUrl } from './urlConfig.js'
let baseUrl = "/api/"
function Request(url,data,method) {
	return new Promise((resolve,reject)=>{
		$.ajax({
			type: method,
			url:baseUrl + url,
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