import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Subscriptions from './subscriptions';
import EpisodesList from './episodes';
import DownloadsList from './downloads';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import Playing from './playing';
import ChromeCast from './chromecast';

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
            user={this.props.user}
            setChecked={this.props.setChecked}
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
            user={this.props.user}
            setChecked={this.props.setChecked}
          />
        </ScrollView>
        {this.props.searching ? (
          <ChromeCast
            url={this.props.playing.enclosures[0].url}
            meadiaTitle={this.props.playing.title}
            imageUrl={
              this.props.playing.media
                ? this.props.playing.media.content[0].url[0]
                : this.props.showItems.data.artworkUrl600
            }
            startAt={this.props.searching}
            setSearching={this.props.setSearching}
          />
        ) : (
          <Playing
            item={this.props.playing}
            duration={this.props.duration}
            sound={this.props.sound}
            setSearching={this.props.setSearching}
            showItems={this.props.showItems}
          />
        )}
      </Swiper>
    );
  }
}

export default Home;

//~~TODO: move Chromecast into swiper~~
//TODO: change setChecked to setUser
