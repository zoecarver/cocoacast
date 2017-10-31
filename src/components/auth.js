import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { appId, callback } from '../config/load';
import { set_user, login, logout } from '../actions/storage';
import { FlatLogoutButton, FlatLoginButton } from './MKstuff';
import { loadUser } from '../actions/load';

const _login = () =>
  login().then(() =>
    set_user().then(() => {
      loadUser().then(user => console.log('User ', user));
    })
  );

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <FlatLogoutButton onPress={() => logout()} />
        <FlatLoginButton onPress={() => _login()} />
        <Text>{'\n\n'}</Text>
      </View>
    );
  }
}

export default Auth;
