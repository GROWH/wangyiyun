import React, { Component } from 'react'
import '../assets/css/play.scss'

import { query } from "../utils";

export default class Play extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.match.params.id,

            // 播放状态
            play: false,
            // 音乐详情
            info: {},
            // 音乐播放控件的旋转角度
            deg: '-15deg',
            // 音乐播放地址
            playUrl: '',

            // 歌词
            lyric: []
        }
    }

    // 切换播放状态
    toggle() {
        this.setState({
            play: !this.state.play,
            deg: this.state.play ? '-15deg' : 0
        }, () => {
            // console.log(this.audio);
            // audio的dom对象上有一个play()方法,可以实现音乐的播放
            // audio的dom对象上有一个pause()方法,可以实现音乐的暂停
            if (this.state.play) {
                this.audio.play()
            } else {
                this.audio.pause()
            }
        })


    }

    // 获取音乐详情
    async getDetail() {
        const res = await query(`/song/detail?ids=${this.state.id}`);
        if (res.code === 200) {
            // console.log(res);
            this.setState({ info: res.songs[0].al })


        }
    }

    // 获取音乐播放地址
    async getPlayUrl() {
        const res = await query(`/song/url?id=${this.state.id}`)
        if (res.code === 200) {
            // console.log(res);
            this.setState({ playUrl: res.data[0].url })

        }

    }

    // 获取歌词
    async getlyric() {
        const res = await query('/lyric?id=' + this.state.id)
        if (res.code === 200) {
            // console.log(res);

            this.setState({
                lyric: this.lyricFmt(res.lrc.lyric)
            })
            // console.log(res.lrc.lyric);

        }
    }

    // 歌词格式化
    lyricFmt(lyric) {
        const reg = /(\[.*\])(.*)/g;
        const lyricArr = [];
        lyric.replace(reg, (a, b, c) => {
            lyricArr.push(c);
        });
        return lyricArr;
    }



    componentWillMount() {
        this.getDetail()
        this.getPlayUrl()
        this.getlyric()
    }
    render() {
        const controlStyle = {
            // 旋转角度
            transform: 'rotate(' + this.state.deg + ')'
        }
        return (
            <div className="play-container">

                {/* 播放控件 */}
                <div style={controlStyle} className="play-controls"></div>
                {/* 黑色圆圈及内部 */}
                <div className="play-wrap">
                    {/* <img src={require('../assets/img/hot_music_bg_2x.jpg')} alt="" /> */}
                    <img className={this.state.play ? 'sport' : ''} src={this.state.info.picUrl} alt="" />
                    <div className={['btn', this.state.play ? 'btn-pause' : 'btn-play'].join(' ')} onClick={() => this.toggle()}></div>
                    {/* 音乐播放控件 */}
                    <audio ref={(input) => this.audio = input} src={this.state.playUrl} controls style={{ display: 'none' }}></audio>


                </div>
                <div className="content">
                    {/* 歌名 */}
                    <h3>{this.state.info.name}</h3>
                    {/* 歌词 */}
                    {/* <p>歌词</p> */}
                    {this.state.lyric.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </div>
            </div>
        )
    }
}
