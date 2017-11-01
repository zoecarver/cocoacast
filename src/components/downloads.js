import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import Subscriptions from './subscriptions';
import Auth from './auth';
import _ from 'lodash';
import _styles from '../styles';
import { PlainFab } from './MKstuff';
import _play from '../actions/sound';
import Episode from './episode_item';

let { height, width } = Dimensions.get('window');

const styles = _styles(width, height);

class Downloads extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.items ? (
          _.map(this.props.items, (item, i) => (
            <Episode
              key={i}
              item={item}
              downloads={this.props.downloads}
              setDownloads={this.props.setDownloads}
              unSetDownloads={this.props.unSetDownloads}
              downloading={this.props.downloading}
              setStateCurrentlyDownloading={
                this.props.setStateCurrentlyDownloading
              }
              setPlaying={this.props.setPlaying}
              setSound={this.props.setSound}
              sound={this.props.sound}
              setDuration={this.props.setDuration}
              duration={this.props.duration}
            />
          ))
        ) : (
          <Text> Your downloaded episodes will apear here </Text>
        )}
      </View>
    );
  }
}

export default Downloads;
