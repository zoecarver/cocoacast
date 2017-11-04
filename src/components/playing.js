import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import { Slider, Icon } from 'react-native-elements';
import { PPIcon } from './episode_item';
import _styles from '../styles';

let { height, width } = Dimensions.get('window');
const styles = _styles(width, height);
const theme = getTheme();
const format_date = date => {
  let arr = new Date(date).toString().split(' ');
  arr = [arr[0], arr[1], arr[2], arr[3]];
  return arr.join(' ');
};

class Backward extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.skip}
        onPress={() => {
          this.props.sound.getCurrentTime(seconds => {
            console.log('current time', seconds);
            this.props.sound.setCurrentTime(seconds + this.props.seconds);
          });
        }}
      >
        <Icon size={26} name={"replay-"+this.props.seconds.toString()} color="#f50" />
      </TouchableOpacity>
    );
  }
}

class Forward extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.skip}
        onPress={() => {
          this.props.sound.getCurrentTime(seconds => {
            console.log('current time', seconds);
            if (seconds - this.props.seconds > 0) {
              this.props.sound.setCurrentTime(seconds - this.props.seconds);
            } else {
              this.props.sound.setCurrentTime(0);
            }
          });
        }}
      >
        <Icon size={26} name={"forward-"+this.props.seconds.toString()} color="#f50" />
      </TouchableOpacity>
    );
  }
}

class Playing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
    };
  }

  _press() {
    if (this.props.sound) {
      const sound = this.props.sound;

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

  render() {
    const item = this.props.item;
    if (item.created && this.props.sound) {
      return (
        <View style={[theme.cardStyle, styles.playingCard]}>
          <Image
            source={{
              uri: item.media
                ? item.media.content[0].url[0]
                : this.props.showItems.data.artworkUrl600,
            }}
            style={[theme.cardImageStyle, styles.cardImageStyle]}
          />
          <Text style={theme.cardContentStyle}>
            {item.title} - {format_date(item.created)}
          </Text>
          <View style={theme.cardMenuStyle} />
          <View style={[theme.sliderView, theme.cardActionStyle]}>
            <Slider
              minimumValue={0}
              maximumValue={
                item.enclosures[0].length
                  ? item.enclosures[0].length
                  : this.props.duration
              }
              value={0.3}
              minimumTrackTintColor={'#b3b3b3'}
              thumbTintColor={'#b3b3b3'}
              thumbTouchSize={{ width: 20, height: 20 }}
              onValueChange={value => this.props.sound.setCurrentTime(value)}
            />
          </View>
          <View style={[theme.cardActionStyle, styles.controlView]}>
            <Backward seconds={10} />
            <Backward seconds={30} />
            <TouchableOpacity onPress={this._press.bind(this)}>
              <PPIcon size={52} playing={this.state.playing} />
            </TouchableOpacity>
            <Forward seconds={30} />
            <Forward seconds={10} />
            <View style={styles.br}/>
            <View >
              <TouchableOpacity onPress={() => this.props.setSearching(true)}>
                <Icon name="cast" color="#f50" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default Playing;
//~~TODO: fix for cortex and non media stuff~~
