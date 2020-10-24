// 使用promise对fetch进行封装


/*
url:接口地址
data:请求体
method：请求方式
headers：请求头（是一个对象）
*/

// 普通表单的请求头：查询字符串，key=value&key=value
// 'content-type':'application/x-www-form-urlencoded'

// json格式的数据：{key:value,key:value}
// 默认使用json
// 'content-type':'application/json'

// 'content-type':'application/form-data'

export function query(url, data, method = 'GET', headers) {

    // let baseUrl = "http://localhost:4000"
    // let baseUrl = ""

    // 开发环境
    if(process.env.NODE_ENV==='development'){
        var baseUrl = '/api';
    }else{  // 生产环境
        var baseUrl='http://localhost:4000';
    }    
    return new Promise(function (resolve, reject) {
            const options = {
                method,
                headers: Object.assign({
                    'content-type': 'application/json'
                }, headers)
            }
              //GET请求不能传递body请求体, 否则会错误
            if(method==="POST"){
                options.body=JSON.stringify(data)
            }
        

        fetch(baseUrl+url,options).then(response => response.json()).then(res => {
                if (res.code === 200) {
                    resolve(res)
                }
            })
    })
}