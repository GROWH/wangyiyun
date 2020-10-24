import React, { Component } from 'react'
import "../assets/css/recommend.scss";

import { Link } from "react-router-dom";


import { Carousel, Row, Col, Card, List } from 'antd';
// 导入icon图标
import { PlayCircleOutlined } from "@ant-design/icons";

// 导入数据请求方法
import { query } from "../utils";


const { Meta } = Card;




export default class Recommend extends Component {
    constructor() {
        super()
        this.state = {
            // 轮播图
            banners: [],
            // 推荐歌单
            recommendList: [],
            // 最新音乐
            newSongs:[]
        }
    }

    // 获取轮播图的方法
    getBanners() {
        query('/banner').then(res => {
            // console.log(res);
            if (res.code === 200) {
                // 更新数据
                this.setState({ banners: res.banners })
            }
        })
    }


    //获取歌单的方法
    getRecommendList() {
        query('/personalized?limit=9').then(res => {
            // console.log(res);
            if (res.code === 200) {
                this.setState({ recommendList: res.result })
            }

        })
    }

    // 新歌推荐方法
    getNewSongs() {
        query('/personalized/newsong').then(res => {
            // console.log(res);
            if (res.code === 200) {
                this.setState({newSongs:res.result})
            }
        }
        )
    }



    componentWillMount() {
        this.getBanners()
        this.getRecommendList()
        this.getNewSongs()
    }
    render() {
        // 解构赋值
        const { banners, recommendList,newSongs } = this.state
        const {push}=this.props.history
        return (
            <div className="recommend-container">
                {/* 轮播图 */}
                <Carousel>
                    {
                        banners.map(item => (
                            <div key={item.targetId} >
                                <img src={item.imageUrl} title={item.typeTitle} alt={item.typeTitle} />
                            </div>
                        ))
                    }


                </Carousel>


                {/* 歌单推荐 */}
                <div className="section">
                    <h3>歌单推荐</h3>
                    <Row gutter={10}>
                        {
                            recommendList.map(item => (
                                <Col span={8} key={item.id} onClick={()=>push('/songlist/'+item.id)}>
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src={item.picUrl} />}
                                    >
                                        <Meta title={item.name} description={item.copywriter.substr(0, 4)} />
                                    </Card>
                                </Col>
                            ))

                        }

                    </Row>
                </div>


                {/* 新歌推荐 */}
                <div className="section">
                    <h3>新歌推荐</h3>
                    <List
                        itemLayout="horizontal"
                        dataSource={newSongs}
                        renderItem={item => (
                            <List.Item
                                actions={[<PlayCircleOutlined onClick={()=>this.props.history.push('/play/'+item.id)} style={{ fontSize: '26px' }} />]}
                            >
                                <List.Item.Meta

                                    title={<Link to={'/play/'+item.id}>{item.name}</Link>}
                                    description={item.song.alias[0]}
                                />
                            </List.Item>
                        )}
                    />

                </div>

            </div>
        )
    }
}
