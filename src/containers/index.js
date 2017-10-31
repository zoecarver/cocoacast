import { connect } from 'react-redux';
import {
  setCurrent,
  setShows,
  getDownloads,
  removeDownloads,
  setDownloading,
} from '../redux/actions';
import Home from '../components/home';

const SateToProps = state => {
  return {
    shows: state.main.shows,
    showItems: state.main.showItems,
    downloads: state.main.downloads,
    downloading: state.main.downloading,
  };
};

const DispatchToProps = dispatch => {
  return {
    setCurrent: (element, shows) => dispatch(setCurrent(element, shows)),
    setShows: arr => dispatch(setShows(arr)),
    setDownloads: arr => dispatch(getDownloads(arr)),
    unSetDownloads: (title, downloads) =>
      dispatch(removeDownloads(title, downloads)),
    setStateCurrentlyDownloading: (title, setTo, downloading) =>
      dispatch(setDownloading(title, setTo, downloading)),
  };
};

export default (VisibleCounter = connect(SateToProps, DispatchToProps)(Home));
