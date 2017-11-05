import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import { Slider, Icon, Badge } from 'react-native-elements';
import { PPIcon } from './episode_item';
import _styles from '../styles';
import HTML from 'react-native-render-html';

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
            if (seconds - this.props.seconds > 0) {
              this.props.sound.setCurrentTime(seconds - this.props.seconds);
            } else {
              this.props.sound.setCurrentTime(0);
            }
          });
        }}
      >
        <Icon
          size={26}
          name={'replay-' + this.props.seconds.toString()}
          color="#f50"
        />
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
            this.props.sound.setCurrentTime(seconds + this.props.seconds);
          });
        }}
      >
        <Icon
          size={26}
          name={'forward-' + this.props.seconds.toString()}
          color="#f50"
        />
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
      if (this.state.showNotes) {
        return (
          <View>
            <View style={styles.showNotesContainter}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ showNotes: !this.state.showNotes })}
              >
                <Badge raised value="DON'T SHOW NOTES" />
              </TouchableOpacity>
              <ScrollView>
                <HTML
                  html={item.description}
                  tagStyles={{
                    p: theme.cardContentStyle,
                    a: {
                      textDecorationLine: 'none',
                      color: 'teal',
                      fontWeight: '800',
                    },
                  }}
                />
              </ScrollView>
            </View>
          </View>
        );
      }
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
          <View style={theme.cardMenuStyle}>
            <TouchableOpacity
              onPress={() =>
                this.setState({ showNotes: !this.state.showNotes })}
            >
              <Badge raised value="SHOW NOTES" />
            </TouchableOpacity>
          </View>
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
            <Backward sound={this.props.sound} seconds={10} />
            <Backward sound={this.props.sound} seconds={30} />
            <TouchableOpacity onPress={this._press.bind(this)}>
              <PPIcon size={52} playing={this.state.playing} />
            </TouchableOpacity>
            <Forward sound={this.props.sound} seconds={30} />
            <Forward sound={this.props.sound} seconds={10} />
            <View style={styles.br} />
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.props.sound.getCurrentTime(seconds => {
                    this.props.setSearching(seconds);
                  })}
              >
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
