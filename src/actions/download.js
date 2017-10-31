import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';
import { add_download } from './storage';

export default (item, func, setStateCurrentlyDownloading, downloading) => {
  let file = item.title + '.mp3';
  file = file.replace(/[^A-Z0-9]/gi, '_');
  file = `${RNFS.DocumentDirectoryPath}/` + file + '.mp3';

  console.log('started downloading', file);
  setStateCurrentlyDownloading(item.title, true, downloading);

  return RNFetchBlob.config({
    path: file,
  })
    .fetch('GET', item.enclosures[0].url, {})
    .then(res => {
      console.log('The file saved to ', res.path());
      console.log('done downloading');
      item.enclosures[0].url = file;

      return add_download(item).then(resp => {
        console.log('recived responce and saving...', resp);
        func(resp);
        setStateCurrentlyDownloading(item.title, false, downloading);
      });
    });

  // await RNFS.downloadFile({
  //   fromUrl: item.enclosures[0].url,
  //   toFile: file,
  // }).promise.then(() => {
  //   console.log('done downloading');
  //   item.enclosures[0].url = file;
  //
  //   add_download(item).then(resp => {
  //     console.log('recived responce and saving...', resp);
  //     func(resp);
  //     setStateCurrentlyDownloading(item.title, false, downloading);
  //   });
  // })
};
