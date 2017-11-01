import { AsyncStorage } from 'react-native';
import { ip, port } from '../config/load';

export function subscribe(user_id, name, func) {
  fetch('http://' + ip + port + '/subscribe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user_id,
      podId: name,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      AsyncStorage.setItem('User', JSON.stringify(responseJson), () => {
        func(responseJson);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

export function unSubscribe(user_id, name, func) {
  fetch('http://' + ip + port + '/unsubscribe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user_id,
      podId: name,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      AsyncStorage.setItem('User', JSON.stringify(responseJson), () => {
        func(responseJson);
      });
    })
    .catch(error => {
      console.error(error);
    });
}
