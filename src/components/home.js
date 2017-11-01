import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Subscriptions from './subscriptions';
import Auth from './auth';
import EpisodesList from './episodes';
import DownloadsList from './downloads';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Playing from './playing';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Swiper loop={false} index={1}>
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
            setPlaying={this.props.setPlaying}
            setSound={this.props.setSound}
            sound={this.props.sound}
            setDuration={this.props.setDuration}
            duration={this.props.duration}
          />
        </ScrollView>
        <ScrollView>
          <Subscriptions
            setCurrent={this.props.setCurrent}
            setShows={this.props.setShows}
            setDownloads={this.props.setDownloads}
            shows={this.props.shows}
            setUser={this.props.setUser}
            user={this.props.user}
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
            setPlaying={this.props.setPlaying}
            setSound={this.props.setSound}
            sound={this.props.sound}
            setDuration={this.props.setDuration}
            duration={this.props.duration}
          />
        </ScrollView>
        <Playing item={this.props.playing} duration={this.props.duration} sound={this.props.sound} />
      </Swiper>
    );
  }
}

export default Home;
