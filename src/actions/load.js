import { AsyncStorage } from 'react-native';
import { ip, port } from '../config/load';

exports.loadUser = () =>
  new Promise(resolve => {
    AsyncStorage.getItem('User', (err, result) => {
      console.log('user req got', result);
      if (result) {
        resolve(JSON.parse(result));
      } else {
        resolve(false);
      }
    });
  });

exports.loadSubs = (user, ip, port) =>
  new Promise(resolve => {
    fetch('https://' + ip + port + '/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        user: user,
      }),
    })
      .then(response => {
        console.log(response.status, response);
        if (response.status === 200) {
          return response.json();
        } else {
          return [];
        }
      })
      .then(responseJson => {
        console.log('arr: ', responseJson.arr);
        resolve(responseJson.arr);
      })
      .catch(error => {
        //TODO:handle this error better
        console.error(error);
      });
  });

exports.loadDownloadSubs = () =>
  new Promise(resolve => {
    AsyncStorage.getItem('Downloads', (err, result) => {
      result = JSON.parse(result);
      console.log('got: ' + result);
      if (result) {
        resolve(result);
      } else {
        resolve([]);
      }
    });
  });

exports.search = search_term =>
  new Promise(resolve => {
    fetch('https://' + ip + port + '/search/' + search_term, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(res => {
        console.log('search res', res);
        if (res.status === 200) {
          return res.json();
        }else {
          throw new Error(404);
        }
      })
      .then(responseJson => {
        console.log('got search', responseJson);
        resolve(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  });
