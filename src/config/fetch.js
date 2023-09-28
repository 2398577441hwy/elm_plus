export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
    console.log(data)
	type = type.toUpperCase();
	// console.log(url,data,type,method)
	console.log(data)
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.slice(0,dataStr.length - 1)
			url = url + '?' + dataStr;
			console.log(url)
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		
		try {
			console.log(url,requestConfig)
			const response = await fetch(url, requestConfig);
			console.log(response)
			const responseJson = await response.json();
			console.log(url,requestConfig)
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	}
}