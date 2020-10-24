import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { query } from "../utils";
import '../assets/css/serach.scss'
import { Input, Divider, Row, Col, Button, List,message  } from 'antd';

// 导入icon图标
import { SearchOutlined, PlayCircleOutlined } from "@ant-design/icons";

export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            // 输入框输入的 搜索关键词
            keywords: '',
            // 热门搜索
            hots: [],
             // 搜索结果
             songs:[]

        }
    }
    // 获取热门搜索
    async getHots() {
        const res = await query('/search/hot')
        // console.log(res);
        this.setState({ hots: res.result.hots })

    }
    componentWillMount() {
        this.getHots()

    }


    // 搜索输入框的change事件处理函数（手动可以输入）
    keywordsUpdate(event) {
        const keywords = event.target.value;
        this.setState({ keywords });

    }


    // 搜索输入框keyup事件的处理函数（按下enter键实现搜索）
    // keyCode 键盘码
    enter(event) {
        if (event.keyCode === 13) {
            //执行搜索操作
            this.search();
        }
    }

    // 点击搜索热词, 更新keywords
    setKeywords(keywords) {
        this.setState({ keywords }, () => {
            // 第一种: 执行一次搜索
            this.search();
        });

    }

    //    // 第二种：keywords搜索关键词更新之后,手动执行一次搜索（keywords状态数据发生变化时）
    //    componentDidUpdate(){
    //     this.search();
    // }

    // 搜索方法
    async search() {
        // 表单校验
        if (this.state.keywords.trim() === '') {
            return message.warning('请输入搜索关键词');
        }
        const res = await query('/search?keywords=' + this.state.keywords);
        if (res.code === 200) {
            // 更新数据
            // console.log(res);
            this.setState({ songs: res.result.songs });
        }
    }


    render() {
        const data = [
            'Racing car sprays burning fuel into crowd.',
            'Japanese princess to wed commoner.',
            'Australian walks 100km after outback crash.',
            'Man charged over missing wedding girl.',
            'Los Angeles battles huge wildfires.',
        ];
        return (
            <div className="search-container">
                {/* <Input size="large" placeholder="large size" prefix={<PlayCircleOutlined style={{ fontSize: '26px' }} />} /> */}
                <Input value={this.state.keywords} onChange={(event) => this.keywordsUpdate(event)} onKeyUp={this.enter.bind(this)} size="large" placeholder="请输入搜索关键词" prefix={<SearchOutlined />} />
                <Divider />
                <Row gutter={10}>
                    {
                        this.state.hots.map((item) => (

                            <Col key={item.first}>
                                <Button onClick={() => this.setKeywords(item.first)}>{item.first}</Button>
                            </Col>

                        )
                        )
                    }
                </Row>
                <Divider />
                <List
                    dataSource={this.state.songs}
                    renderItem={item => (
                        <List.Item
                            actions={[<PlayCircleOutlined onClick={()=>this.props.history.push('/play/'+item.id)} style={{ fontSize: '26px' }} />]}
                        >
                            <Link to={'/play/'+item.id}>{item.name.substr(0,20)+'...'}</Link>
                        </List.Item>
                    )}
                />

            </div>

        )
    }
}
