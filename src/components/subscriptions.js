import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import ShowCard from './ShowCard';
import { loadSubs, loadUser, loadDownloadSubs } from '../actions/load';
import _ from 'lodash';
import { MKSpinner } from 'react-native-material-kit';
import Sound from 'react-native-sound';
import _play from '../actions/sound';
import { SearchBar } from 'react-native-elements';
import { search } from '../actions/load';

const _loadSubs = () => {
  return loadUser().then(user => {
    return loadSubs(user, 'cocoacast.herokuapp.com', '').then(shows => {
      console.log('shows: ', shows);

      return {
        shows: shows,
        user: user,
      };
    });
  });
};

class Subscriptions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    _loadSubs().then(obj => {
      this.props.setShows(obj.shows);
      this.props.setUser(obj.user);
    });

    loadDownloadSubs().then(downloaded_shows => {
      this.props.setDownloads(downloaded_shows);
    });
  }

  render() {
    return (
      <ScrollView>
        <SearchBar
          onChangeText={text => this.setState({ seach: text })}
          placeholder="Type Here..."
        />
        <Button
          title={'search'}
          onPress={() =>
            search(this.state.seach).then(res => this.props.setShows([res]))}
        />
        {this.props.shows ? (
          _.map(this.props.shows, (show, i) => (
            <ShowCard
              key={i}
              element={i}
              shows={this.props.shows}
              setCurrent={this.props.setCurrent}
              data={show}
              user={this.props.user}
              setUser={this.props.setUser}
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
