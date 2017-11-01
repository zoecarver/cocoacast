import { combineReducers } from 'redux';

const defaultState = {
  shows: [],
  showItems: [],
  downloads: [],
  downloading: [],
  user: {},
  playing: {},
  sound: void 0,
  duration: void 0,
  searching: false,
};

const main = (state = defaultState, action) => {
  switch (action.type) {
    case 'CURRENT':
      return Object.assign({}, state, {
        showItems: action.val,
      });
    case 'SHOWS':
      return Object.assign({}, state, {
        shows: action.val,
      });
    case 'SET_USER':
      return Object.assign({}, state, {
        user: action.val,
      });
    case 'DOWNLOADS':
      return Object.assign({}, state, {
        downloads: action.val,
      });
    case 'REMOVE_DOWNLOADS':
      return Object.assign({}, state, {
        downloads: action.val,
      });
    case 'SET_DOWNLOADING':
      return Object.assign({}, state, {
        downloading: action.val,
      });
    case 'SET_PLAYING':
      return Object.assign({}, state, {
        playing: action.val,
      });
    case 'SET_SOUND':
      return Object.assign({}, state, {
        sound: action.val,
      });
    case 'SET_DURATION':
      return Object.assign({}, state, {
        duration: action.val,
      });
    case 'SET_SEARCHING':
      return Object.assign({}, state, {
        searching: action.val,
      });
    default:
      return state;
  }
};

export default combineReducers({
  main,
});
