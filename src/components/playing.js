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
            source={{ uri: item.media.content[0].url[0] }}
            style={[theme.cardImageStyle, styles.cardImageStyle]}
          />
          <Text style={theme.cardContentStyle}>
            {item.title} - {format_date(item.created)}
          </Text>
          <View style={theme.cardMenuStyle} />
          <View style={[theme.sliderView, theme.cardActionStyle]}>
            <Slider
              minimumValue={0}
              maximumValue={this.props.duration ? this.props.duration : 1}
              value={0.3}
              minimumTrackTintColor={'#b3b3b3'}
              thumbTintColor={'#b3b3b3'}
              thumbTouchSize={{ width: 20, height: 20 }}
              onValueChange={value => this.props.sound.setCurrentTime(value)}
            />
          </View>
          <View style={[theme.cardActionStyle, styles.controlView]}>
            <TouchableOpacity
              onPress={() => {
                this.props.sound.getCurrentTime(seconds => {
                  console.log('current time', seconds);
                  this.props.sound.setCurrentTime(seconds + 15);
                });
              }}
            >
              <Icon name="replay-10" color="#f50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._press.bind(this)}>
              <PPIcon playing={this.state.playing} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.sound.getCurrentTime(seconds => {
                  console.log('current time', seconds);
                  if (seconds - 15 > 0) {
                    this.props.sound.setCurrentTime(seconds - 15);
                  } else {
                    this.props.sound.setCurrentTime(0);
                  }
                });
              }}
            >
              <Icon name="forward-10" color="#f50" />
            </TouchableOpacity>
          </View>
          <View style={theme.cardActionStyle}>
            <Button
              title={'cast'}
              onPress={() => this.props.setSearching(true)}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default Playing;
//TODO: fix for cortex and non media stuff
