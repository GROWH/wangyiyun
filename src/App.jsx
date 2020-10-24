import React from 'react';
import './App.css';

// import { render } from 'react-dom';
import Index from "./pages/Index";




// HashRouter:路由容器组件，只需要在最外层进行包裹
// Route:进行路由规则配置的组件，同时充当路由占位符（路由出口）
// NavLink:有高亮显示，创建路由导航链接
// Link：点击某个链接没有高亮显示
// Switch:防止路由重复匹配
// Redirect:实现路由重定向的组件
// import { HashRouter, Route, NavLink } from "react-router-dom";
import { BrowserRouter as Router} from "react-router-dom";

// Browser模式和 Hash模式的不同：Hash在项目打包后可以直接通过文件方式打开，Browser必须依赖一个外网打开

class App extends React.Component {

  render() {
    return (
      // <HashRouter>
      <Router>    
      <Index/>
      </Router>
      // </HashRouter>

    )
  }
}

export default App;
