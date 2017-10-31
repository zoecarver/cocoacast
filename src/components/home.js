import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Subscriptions from './subscriptions';
import Auth from './auth';
import EpisodesList from './episodes';
import DownloadsList from './downloads';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Swiper loop={false} index={0}>
        <ScrollView>
          <DownloadsList
            setDownloads={this.props.setDownloads}
            items={this.props.downloads}
            downloads={this.props.downloads}
            unSetDownloads={this.props.unSetDownloads}
            downloading={this.props.downloading}
            setStateCurrentlyDownloading={
              this.props.setStateCurrentlyDownloading
            }
          />
        </ScrollView>
        <ScrollView>
          <Subscriptions
            setCurrent={this.props.setCurrent}
            setShows={this.props.setShows}
            setDownloads={this.props.setDownloads}
            shows={this.props.shows}
          />
          <Auth />
        </ScrollView>
        <ScrollView>
          <EpisodesList
            setDownloads={this.props.setDownloads}
            items={this.props.showItems.items}
            downloads={this.props.downloads}
            unSetDownloads={this.props.unSetDownloads}
            downloading={this.props.downloading}
            setStateCurrentlyDownloading={
              this.props.setStateCurrentlyDownloading
            }
          />
        </ScrollView>
      </Swiper>
    );
  }
}

export default Home;
