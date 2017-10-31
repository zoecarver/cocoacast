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
  getTheme,
  MKRangeSlider,
  MKSlider,
  MKTextField,
  MKSwitch,
  MKCheckbox,
  MKIconToggle,
  MKButton,
  MKSpinner,
  MKColor,
} from 'react-native-material-kit';
import {SubscribeIcon} from './buttons';
import _styles from '../styles';

const theme = getTheme();
const FlatEppisodeButton = MKButton.flatButton()
  .withText('EPISODES')
  .build();

let { height, width } = Dimensions.get('window');
const styles = _styles(width, height);

class ShowCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;

    return (
      <View style={[theme.cardStyle, styles.cardStyle]}>
        <Image
          source={{ uri: data.data.artworkUrl600 }}
          style={theme.cardImageStyle}
        />
        <Text style={theme.cardContentStyle}>
          {data.title}
          {data.artistName ? ': ' + data.artistName : null}
          {'\n \n' + data.description}
        </Text>
        <View style={theme.cardMenuStyle}>
          <SubscribeIcon/>
        </View>
        <View style={theme.cardActionStyle}>
          <FlatEppisodeButton
            onPress={() =>
              this.props.setCurrent(this.props.element, this.props.shows)}
          />
        </View>
      </View>
    );
  }
}

export default ShowCard;
