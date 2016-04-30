import React, { Component } from 'react';

export default class PlayList extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      show: false,
    }
  }

  secToTime(sec) {
    sec = sec / 1000;
    let min = parseInt(sec / 60);
    if (min < 10) {
      min = '0' + min;
    }
    let second = parseInt(sec % 60);
    if (second < 10) {
      second = '0' + second;
    }

    return min + ':' + second;
  }

  getSongClassName(index) {
    if (index == this.props.song.currentSongIndex) {
      return "playlist__content__list__song current";
    } else {
      return "playlist__content__list__song";
    }
  }

  componentWillReceiveProps(props) {
    if (props.showplaylist && !this.state.show) {
      this.setState({
        show: true,
      }); 
    }
    if (!props.showplaylist && this.state.show) {
      this.setState({
        show: false,
      }); 
    }
  }

  componentDidUpdate(props, state) {
    if (this.props.song.currentSongIndex != props.song.currentSongIndex) {
      if (!this.props.song.showplaylist)
        this.autoScroll();
    }
  }

  autoScroll() {
    let target = this.refs.current;
    let container = this.refs.container;
    container.scrollTop = 0;
    container.scrollTop = target.getBoundingClientRect().top - container.getBoundingClientRect().top - 150;
  }

  _closeplaylist(e) {
    this.props.closePlayList();
  }

  _playfromlist(e, index) {
    this.props.playFromList(index);
  }

  render() {
    let Close = require('../assets/icon/close.svg?name=Close');
    return (
      <div className="playlist" style={{ right: this.state.show ? '0px' : '-600px' }}>
        <div className="playlist__header">
          <h2>播放列表</h2>
          <Close 
            className="i"
            onClick={e => this._closeplaylist(e)}
            />
        </div>
        <div className="playlist__content" ref="container">
          <ul className="playlist__content__list">
          {this.props.song.songlist.map(
            (song, index) => {
              return (
                <li 
                  className={this.getSongClassName(index)}
                  ref={this.props.song.currentSongIndex == index ? 'current' : null}
                  onClick={e => this._playfromlist(e, index)}
                  >
                  <div className="playlist__content__list__song-name">
                    <p>{song.name}</p>
                  </div>
                  <div className="playlist__content__list__song-artist">
                    <p>{song.artists[0].name}</p>
                  </div>
                  <div className="playlist__content__list__song-duration">
                    <p>{this.secToTime(song.duration)}</p>
                  </div>
                </li>
              );                                     
            })
          }
          </ul>
        </div>
      </div>    
    );
  }
}
