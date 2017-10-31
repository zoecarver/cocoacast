import { combineReducers } from 'redux';

const defaultState = {
  shows: [],
  showItems: [],
  downloads: [],
  downloading: [],
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
    default:
      return state;
  }
};

export default combineReducers({
  main,
});
