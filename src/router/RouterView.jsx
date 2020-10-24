import React, { Component } from 'react'

import { HashRouter,Switch,Route,Redirect } from "react-router-dom";
// 自己封装的路由组件
export default function RouterView(props){
    return (
        <Switch>
            {
                props.routes.map((item,index)=>{
                    if(item.component){
                        return (
                            <Route exact={item.exact} key={index} path={item.path} component={item.component} />
                        )
                    }else{
                        return (
                            <Route path={item.path} key={index} exact={item.exact} render={()=>{
                                return <Redirect exact={item.exact} to={item.to} />
                            }} />
                        )
                    }
                })
            }
        </Switch>
    )
}
