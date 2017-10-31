import React, { Component, PropTypes } from 'react';
import { View, Button, Dimensions, Text } from 'react-native';
import Subscriptions from './subscriptions';
import Auth from './auth';
import Sound from 'react-native-sound';
import { PlainFab } from './MKstuff';
import _styles from '../styles';
import _play from '../actions/sound';
import { PlayIcon, PauseIcon, DownloadButton } from './buttons';
import _IS from '../actions/intelligent_speed';

let { height, width } = Dimensions.get('window');

const styles = _styles(width, height);

class PPIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View>{!this.props.playing ? <PlayIcon /> : <PauseIcon />}</View>;
  }
}

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      vol: 1,
    };
    this.sound = false;
  }

  _press() {
    if (!this.sound) {
      this.sound = _play({
        key: this.props.item.title,
        url: this.props.item.enclosures[0].url,
      });
    } else {
      if (this.sound.key !== this.props.item.title) {
        console.log(this.sound.key, this.props.item.title);
        console.log('url ', this.props.item.enclosures[0].url);
        this.sound.release();
        this.sound = false;
      } else {
        const sound = this.sound;

        if (this.state.playing) {
          this.setState({ playing: false });
          sound.pause();
        } else {
          this.setState({ playing: true });
          sound.play(() => {
            sound.release();
          });
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.episodes}>
        <PPIcon playing={this.state.playing} onPress={this._press.bind(this)} />
        <DownloadButton
          setDownloads={this.props.setDownloads}
          unSetDownloads={this.props.unSetDownloads}
          title_check={this.props.item.title}
          downloads={this.props.downloads}
          item={this.props.item}
          downloading={this.props.downloading}
          setStateCurrentlyDownloading={this.props.setStateCurrentlyDownloading}
        />
      <Text style={{flex: 0.85}}>{this.props.item.title + '\n'}</Text>
      </View>
    );
  }
}

export default Episode;
