import { connect } from 'react-redux';
import {
  setCurrent,
  setShows,
  getDownloads,
  removeDownloads,
  setDownloading,
  setUser,
  setPlaying,
  setSound,
  setDuration,
  setSearching,
} from '../redux/actions';
import Home from '../components/home';

const SateToProps = state => {
  return {
    shows: state.main.shows,
    showItems: state.main.showItems,
    downloads: state.main.downloads,
    downloading: state.main.downloading,
    user: state.main.user,
    playing: state.main.playing,
    sound: state.main.sound,
    duration: state.main.duration,
    searching: state.main.searching,
  };
};

const DispatchToProps = dispatch => {
  return {
    setCurrent: (element, shows) => dispatch(setCurrent(element, shows)),
    setShows: arr => dispatch(setShows(arr)),
    setUser: obj => dispatch(setUser(obj)),
    setDownloads: arr => dispatch(getDownloads(arr)),
    unSetDownloads: (title, downloads) =>
      dispatch(removeDownloads(title, downloads)),
    setStateCurrentlyDownloading: (title, setTo, downloading) =>
      dispatch(setDownloading(title, setTo, downloading)),
    setPlaying: obj => dispatch(setPlaying(obj)),
    setSound: sound => dispatch(setSound(sound)),
    setDuration: num => dispatch(setDuration(num)),
    setSearching: bool => dispatch(setSearching(bool)),
  };
};

export default (VisibleCounter = connect(SateToProps, DispatchToProps)(Home));

//TODO: fix duration thing so that it can just be called from this.props.sound
