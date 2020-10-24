// 1-导入React
import React from 'react';


//  同步加载
// import Recommend from "../pages/Recommend";
// import Hot from "../pages/Hot";
// import Search from "../pages/Search";


// 组件懒加载
const Recommend =React.lazy(()=>import('../pages/Recommend'))
const Hot =React.lazy(()=>import('../pages/Hot'))
const Search =React.lazy(()=>import('../pages/Search'))
const SongList =React.lazy(()=>import('../pages/SongList'))
const Play =React.lazy(()=>import('../pages/Play'))

// 路由规则数据
const routes=[
   {
    path:'/',
    to:'recommend',    // 路由重定向
    exact:true      // 启用严格匹配模式
   },
   {
    path:'/recommend',
   component:Recommend,
    exact:false 
   },
   {
    path:'/hot',
   component:Hot,
    exact:false 
   },
   {
    path:'/search',
    component:Search,
    exact:false 
   },

    //  动态路由  歌单详情
    {
        path:'/songlist/:id',
        component:SongList,
        exact:false 
       },

       {
        path:'/play/:id',
        component:Play,
        exact:false 
       },
    



]

export default routes;