import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import Auth from './auth';
import array from './settings_items';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <List>
          {
            array.map((item, i) => (
              <TouchableOpacity onPress={item.press}>
                <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{name: item.icon}}
                />
              </TouchableOpacity>
            ))
          }
        </List>
        <Auth />
      </View>
    );
  }
}

export default Settings;
