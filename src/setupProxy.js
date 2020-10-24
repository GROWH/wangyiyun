// 导入http-proxy-middleware

const proxy= require('http-proxy-middleware');
// 对外暴露一个模块
module .exports=function(app){
    app.use(proxy.createProxyMiddleware('/api',{
        // http://localhost:4000/api/banner => http://localhost:4000/banner
        target:'http://localhost:4000',
        pathRewrite:{
            '^/api':''
        }
    }));

}
