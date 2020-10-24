import React, { Component } from 'react'
import '../assets/css/index.scss'


import Recommend from "./Recommend";
import Hot from "./Hot";
import Search from "./Search";

import routes from "../router/routes";
import RouterView from "../router/RouterView";

// 自定义loading加载图标
import { LoadingOutlined } from '@ant-design/icons';

// 导入页头
// Affix--固钉   Spin--加载中
import { PageHeader, Affix, Spin } from 'antd';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";


import { Suspense } from "react";

export default class Index extends Component {

    // fallback  当组件没有加载回来的时候，给用户呈现的页面结构
    render() {
        
        const spinStyle = {
            textAlign: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            margin: 'auto',
            height: 40
        }
        
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        return (
            // <Suspense fallback={<h1>loading...</h1>}>
            <Suspense fallback={<div style={spinStyle}>
               <Spin indicator={antIcon}  size="large"/>
            </div>}>
                <Router>
                    <div>
                        <Affix>
                            {/* 可以写空白标签或者一个div标签，或者<React.Fragment></React.Fragment>,,不建议写div标签，会增加性能开销,不能写类名*/}
                            <div>
                                <div className="header">
                                    <PageHeader
                                        className="site-page-header"
                                        title="优音乐"
                                    />
                                    <a href="#" className="btn-download">下载APP</a>
                                </div>

                                {/* 路由导航链接*/}
                                <div className="navbar">
                                    <NavLink to='/recommend'>推荐</NavLink>
                                    <NavLink to='/hot'>热歌</NavLink>
                                    <NavLink to='/search'>搜索</NavLink>
                                </div>
                            </div>
                        </Affix>
                        {/* <Switch>
                    <Route path='/recommend' component={Recommend} />
                    <Route path='/hot' component={Hot} />
                    <Route path='/search' component={Search} />
                </Switch> */}

                        {/* 路由规则 */}
                        <RouterView routes={routes} />
                    </div>
                </Router>
            </Suspense>

        )
    }
}
