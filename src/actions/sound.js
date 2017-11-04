import Sound from 'react-native-sound';

export default testInfo => {
  const callback = (error, sound) => {
    if (error) {
      console.error('rn sound ', error);
      return;
    }

    sound.play(() => {
      sound.release();
    });
  };

  // If the audio is a 'require' then the second parameter must be the callback.
  if (testInfo.isRequire) {
    const sound = new Sound(testInfo.url, error => callback(error, sound));
    sound.key = testInfo.key;
    //func(sound)
    //sound.play();
    return sound;
  } else {
    const sound = new Sound(testInfo.url, testInfo.basePath, error =>
      callback(error, sound)
    );
    sound.key = testInfo.key;
    //func(sound)
    //sound.play();
    return sound;
  }
};
