import React, { Component, PropTypes } from 'react';
import { View, Button, Dimensions, Text, TouchableOpacity } from 'react-native';
import Subscriptions from './subscriptions';
import Auth from './auth';
import Sound from 'react-native-sound';
import { PlainFab } from './MKstuff';
import _styles from '../styles';
import _play from '../actions/sound';
import { PlayIcon, PauseIcon, DownloadButton } from './buttons';
import _IS from '../actions/intelligent_speed';
import _setPlayed from '../actions/checked';
import { Icon } from 'react-native-elements';
import track from '../actions/analytics';

let { height, width } = Dimensions.get('window');

const styles = _styles(width, height);

export class PPIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {!this.props.playing ? (
          <PlayIcon size={this.props.size} onPress={this.props.func} />
        ) : (
          <PauseIcon size={this.props.size} onPress={this.props.func} />
        )}
      </View>
    );
  }
}

class Episode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      vol: 1,
    };
  }

  _setSound() {
    if (
      this.props.user.checked &&
      !this.props.user.checked.includes(this.props.item.title)
    ) {
      _setPlayed(
        this.props.user.id,
        this.props.item.title,
        this.props.setChecked
      );
    }
    this.props.setSound(
      _play({
        key: this.props.item.title,
        url: this.props.item.enclosures[0].url,
      })
    );
    this.setState({ playing: true });
    track('PPIcon', {
      trackEvent: true,
      catagory: 'play',
      action: this.props.item.title,
    });
  }

  _playPauseControl(sound) {
    if (!sound) {
      sound = this.props.sound;
    }

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

  _press() {
    this.props.setPlaying(this.props.item);

    if (!this.props.sound) {
      this._setSound();
    } else {
      if (this.props.sound.key !== this.props.item.title) {
        console.log(this.props.sound.key, this.props.item.title);
        console.log('url ', this.props.item.enclosures[0].url);
        this.props.sound.release();
        this.props.setSound(void 0);
        this._setSound();
      } else {
        this._playPauseControl();
      }
    }
  }

  componentWillMount() {
    if (
      this.props.sound &&
      this.props.sound.isLoaded() &&
      !this.props.duration
    ) {
      console.log(this.props.sound.isLoaded(), this.props.sound.getDuration());
      this.props.setDuration(this.props.sound.getDuration());
    }
  }

  render() {
    return (
      <View style={styles.episodes}>
        <TouchableOpacity onPress={this._press.bind(this)}>
          <PPIcon playing={this.state.playing} />
        </TouchableOpacity>
        <DownloadButton
          setDownloads={this.props.setDownloads}
          unSetDownloads={this.props.unSetDownloads}
          title_check={this.props.item.title}
          downloads={this.props.downloads}
          item={this.props.item}
          downloading={this.props.downloading}
          setStateCurrentlyDownloading={this.props.setStateCurrentlyDownloading}
        />
        <Text style={{ flex: 0.9 }}>{this.props.item.title + '\n'}</Text>
        {this.props.user.checked &&
        this.props.user.checked.includes(this.props.item.title) ? (
          <Icon type="simple-line-icon" name="check" color="#f50" />
        ) : null}
      </View>
    );
  }
}

export default Episode;

//TODO: condence _press so that you don't have
