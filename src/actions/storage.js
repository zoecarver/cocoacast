import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import OAuthManager from 'react-native-oauth';
import { loadDownloadSubs } from './load';

const manager = new OAuthManager('cocoacast');

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

exports.storage = storage;

exports.remove_download = title => {
  new Promise(resolve => {
    loadDownloadSubs().then(downloads => {
      const index = downloads
        .map(function(el) {
          return el.title;
        })
        .indexOf(title);

      downloads.splice(index, 1);

      AsyncStorage.setItem('Downloads', JSON.stringify(downloads), () => {
        console.log('downloads now are', downloads);
        resolve(downloads);
      });
    });
  });
};

exports.add_download = data => {
  return new Promise(resolve => {
    return loadDownloadSubs().then(loaded => {
      console.log('loaded subs form donwload: ', loaded);
      loaded.push(data);
      console.log('now result is', loaded);
      AsyncStorage.setItem('Downloads', JSON.stringify(loaded), () => {
        console.log('saved', loaded);
        return resolve(loaded);
      });
    });
  });
};

exports.set_user = () =>
  new Promise(resolve => {
    manager.configure({
      google: {
        callback_url: `com.cocoacast:/oauth2redirect`,
        client_id:
          '893909331909-ovues4lg901ll71fg6hrkmvml8sascs5.apps.googleusercontent.com',
        client_secret: 'SLbV6aQlc25OG8PqcuaW-n7F',
      },
    });

    const googleUrl = 'https://www.googleapis.com/plus/v1/people/me';
    manager.makeRequest('google', googleUrl).then(resp => {
      resp.data.subscriptions = [];
      console.log('Data -> ', resp.data);

      AsyncStorage.setItem('User', JSON.stringify(resp.data), () => {
        resolve(resp.data);
        //TODO: load user
      });
    });
  });

exports.login = () =>
  new Promise(resolve => {
    manager.configure({
      google: {
        callback_url: `com.cocoacast:/oauth2redirect`,
        client_id:
          '893909331909-ovues4lg901ll71fg6hrkmvml8sascs5.apps.googleusercontent.com',
        client_secret: 'SLbV6aQlc25OG8PqcuaW-n7F',
      },
    });

    manager
      .authorize('google', { scopes: 'profile' })
      .then(resp => resolve(resp))
      .catch(err => console.log(err));
  });

exports.logout = () => {
  manager.configure({
    google: {
      callback_url: `com.cocoacast:/oauth2redirect`,
      client_id:
        '893909331909-ovues4lg901ll71fg6hrkmvml8sascs5.apps.googleusercontent.com',
      client_secret: 'SLbV6aQlc25OG8PqcuaW-n7F',
    },
  });

  manager.deauthorize('google');
};
