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

class EpisodesList extends Component {
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
              setDownloads={this.props.setDownloads}
              unSetDownloads={this.props.unSetDownloads}
              downloads={this.props.downloads}
              downloading={this.props.downloading}
              setStateCurrentlyDownloading={
                this.props.setStateCurrentlyDownloading
              }
            />
          ))
        ) : (
          <Text>Please select an show</Text>
        )}
      </View>
    );
  }
}

export default EpisodesList;
