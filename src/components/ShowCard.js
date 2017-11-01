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
import { subscribe, unSubscribe } from '../actions/subscribe';
import { SubscribeIcon, UnSubscribeIcon } from './buttons';
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
    let name =
      'https://itunes.apple.com/lookup?id=' +
      data.data.collectionId +
      '&entity=podcast';
    console.log('name of ep', name);

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
          {this.props.user.subscriptions &&
          this.props.user.subscriptions.includes(name) ? (
            <TouchableOpacity
              onPress={() =>
                unSubscribe(this.props.user.id, name, this.props.setUser)}
            >
              <UnSubscribeIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                subscribe(this.props.user.id, name, this.props.setUser)}
            >
              <SubscribeIcon />
            </TouchableOpacity>
          )}
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
