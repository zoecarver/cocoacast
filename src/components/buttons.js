import { Icon } from 'react-native-elements'
import React, { Component, PropTypes, InteractionManager } from 'react';
import { PlainFab } from './MKstuff';
import _download from '../actions/download';
import _ from 'lodash';
import RNFS from 'react-native-fs';
import { remove_download } from '../actions/storage';
import { MKSpinner } from 'react-native-material-kit';

const search = (array, id) => {
  var lookup = {};
  for (var i = 0; i < array.length; i++) {
    lookup[array[i].title] = array[i];
  }
  return lookup[id];
};

export class PauseIcon extends Component {
  render() {
    return <Icon
      raised
      name='control-pause'
      type='simple-line-icon'
      color='#f50' />;
  }
}

export class PlayIcon extends Component {
  render() {
    return <Icon
      raised
      name='control-play'
      type='simple-line-icon'
      color='#f50' />;
  }
}

class TrashIcon extends Component {
  render() {
    return <Icon
      raised
      name='trash'
      type='simple-line-icon'
      color='#f50' />;
  }
}

class CloudIcon extends Component {
  render() {
    return <Icon
      raised
      name='cloud-download'
      type='simple-line-icon'
      color='#f50' />;;
  }
}

export class DownloadButton extends Component {
  constructor(props) {
    super(props);
  }

  _remove() {
    console.log('removing', this.props.item.enclosures[0].url);
    this.props.unSetDownloads(this.props.title_check, this.props.downloads);
    remove_download(this.props.item.title);
    return (
      RNFS.unlink(this.props.item.enclosures[0].url)
        .then(() => {
          console.log('FILE DELETED');
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch(err => {
          console.log(err.message);
          console.log('getting rid of file in storage - given the error');
        })
    );
  }

  render() {
    const downloads = this.props.downloads;
    // console.log(this.props.downloading.includes(this.props.title_check), this.props.title_check);

    if (search(downloads, this.props.title_check)) {
      return (
        <TrashIcon onPress={() => this._remove()}/>
      );
    } else if (this.props.downloading.includes(this.props.title_check)) {
      return <MKSpinner />;
    }
    return (
      <CloudIcon onPress={() =>
        _download(
          this.props.item,
          this.props.setDownloads,
          this.props.setStateCurrentlyDownloading,
          this.props.downloading
        )}/>
    );
  }
}
