import { StyleSheet } from 'react-native';

export default (width, height) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    fullView: {
      width: width,
      height: height,
    },
    textfield: {
      margin: 10,
      marginTop: 20,
      width: width - 60,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    legendLabel: {
      color: '#666666',
      backgroundColor: 'transparent',
      marginTop: 10,
      marginBottom: 20,
      fontSize: 12,
      fontWeight: '300',
    },
    episode_view: {
      width: width - 10,
      flexWrap: 'wrap',
      backgroundColor: 'white',
      alignItems: 'flex-start',
      flexDirection: 'row',
      elevation: 5,
      margin: 5,
    },
    plain_fab_defult: {
      height: 50,
      borderRadius: 25,
      width: 50,
      margin: 10,
    },
    cardStyle: {
      width: width * 0.9,
      margin: width * 0.05,
      elevation: 2,
    },
    episodes: {
      width: width - 10,
      flexWrap: 'wrap',
      backgroundColor: 'white',
      alignItems: 'flex-start',
      flexDirection: 'row',
      elevation: 5,
      margin: 5,
    },
    c_fab: {
      flex: 1,
      backgroundColor: 'red',
      height: 50,
      borderRadius: 25,
      width: 50,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardImageStyle: {
      width: width,
    },
    playingCard: {
      width: width,
      height: height,
    },
    sliderView: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
  });
