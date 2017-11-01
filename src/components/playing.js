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
import {
  getTheme
} from 'react-native-material-kit';
import {Slider} from 'react-native-elements';
import _styles from '../styles';

let { height, width } = Dimensions.get('window');
const styles = _styles(width, height);
const theme = getTheme();
const format_date = (date) => {
  let arr = new Date(date).toString().split(' ');
  arr = [arr[0], arr[1], arr[2], arr[3]]
  return arr.join(' ');
}

class Playing extends Component {
  constructor(props) {
    super(props);
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
          <View style={theme.cardMenuStyle}>

          </View>
          <View style={[theme.sliderView, theme.cardActionStyle]}>
            <Slider
              minimumValue={0}
              maximumValue={this.props.duration ? this.props.duration : 1}
              value={0.3}
              minimumTrackTintColor={'#b3b3b3'}
              thumbTintColor={'#b3b3b3'}
              thumbTouchSize={{width: 20, height: 20}}
              onValueChange={(value) => this.props.sound.setCurrentTime(value)} />
          </View>
          <View style={theme.cardActionStyle}>
            <Text>hi</Text>
          </View>
        </View>
      );
    }else {
      return null;
    }
  }
}

export default Playing;
