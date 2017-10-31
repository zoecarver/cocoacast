import {
  getTheme,
  MKRangeSlider,
  MKSlider,
  MKTextField,
  MKSwitch,
  MKCheckbox,
  MKIconToggle,
  MKButton,
  MKSpinner,
  MKColor,
} from 'react-native-material-kit';

export const FlatLogoutButton = MKButton.flatButton()
  .withText('LOG OUT')
  .build();
export const FlatLoginButton = MKButton.flatButton()
  .withText('LOG IN')
  .build();

export const PlainFab = MKButton.plainFab()
  .build();
