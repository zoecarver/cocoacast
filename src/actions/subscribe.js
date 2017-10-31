export function subscribe(name) {
  fetch('http://' + ip + port + '/subscribe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: this.state.user.id,
      podId: name,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      AsyncStorage.setItem('User', JSON.stringify(responseJson), () => {
        this.loadUser(() => {
          this.loadSubs();
        });
      });
    })
    .catch(error => {
      console.error(error);
    });
}

export function unSubscribe(name) {
  fetch('http://' + ip + port + '/unsubscribe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: this.state.user.id,
      podId: name,
    }),
  })
    .then(response => response.json())
    .then(responseJson => {
      AsyncStorage.setItem('User', JSON.stringify(responseJson), () => {
        this.loadUser(() => {
          this.loadSubs();
        });
      });
    })
    .catch(error => {
      console.error(error);
    });
}
