import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import ShowCard from './ShowCard';
import { loadSubs, loadUser, loadDownloadSubs } from '../actions/load';
import _ from 'lodash';
import { MKSpinner } from 'react-native-material-kit';
import Sound from 'react-native-sound';
import _play from '../actions/sound';

const _loadSubs = () => {
  return loadUser().then(user => {
    return loadSubs(user, 'cocoacast.herokuapp.com', '').then(shows => {
      console.log('shows: ', shows);

      return shows;
    });
  });
};

class Subscriptions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    _loadSubs().then(shows => {
      this.props.setShows(shows);
    });

    loadDownloadSubs().then(downloaded_shows => {
      this.props.setDownloads(downloaded_shows);
    });
  }

  render() {
    return (
      <ScrollView>
        {this.props.shows ? (
          _.map(this.props.shows, (show, i) => (
            <ShowCard
              key={i}
              element={i}
              shows={this.props.shows}
              setCurrent={this.props.setCurrent}
              data={show}
            />
          ))
        ) : (
          <MKSpinner />
        )}
      </ScrollView>
    );
  }
}

export default Subscriptions;

//TODO: Make sure loading works possible replacement (this.props.shows && this.props.shows.length > -1)
