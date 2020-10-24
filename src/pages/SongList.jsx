import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { List, Spin } from "antd";
import "../assets/css/hot.scss";

// 导入icon图标
import { PlayCircleOutlined } from "@ant-design/icons";
import { query } from '../utils';

export default class SongList extends Component {
    constructor(props) {
        super()
        this.state = {
            // 热歌榜  info.playlist.tracks 音乐列表
            info: {},
            // 歌单的id
            id:props.match.params.id

        }
    }
    // 获取热歌榜数据
    getData() {
        query('/playlist/detail?id='+this.state.id).then(res => {
            // console.log(res);
            if (res.code === 200) {
                this.setState({ info: res.playlist })
            }

        })
    }


    componentWillMount() {
        this.getData()
    }



    render() {

        // 音乐列表
        const playlist = this.state.info.tracks

        // 背景图片
        const styleBanner = {
            backgroundImage: "url('" + this.state.info.coverImgUrl + "')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }

        
        return (
            <div className="hot-container">
                {
                    playlist && playlist.length > 0 ? (
                        <>
                            <div className="banner" style={styleBanner}>

                            </div>
                            <List
                                bordered
                                header={this.state.info.name}
                                dataSource={playlist}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<PlayCircleOutlined onClick={()=>this.props.history.push('/play/'+item.id)} style={{ fontSize: '26px' }} />]}
                                    >
                                       <Link to={'/play/'+item.id}>{item.name}</Link>
                                    </List.Item>
                                )}
                            />
                        </>
                    ): <div style={{textAlign:'center'}}><Spin size="large" /></div>
                }
            </div>
        )
    }
}
