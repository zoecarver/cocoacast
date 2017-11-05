const compDownloading = (title, setTo, downloading) => {
  if (setTo) {
    downloading.push(title)
    return downloading
  }
  const index = downloading.map(function(el) {
    return el.title;
  }).indexOf(title)
  downloading.splice(index, 1);
  return downloading
}

export const setCurrent = (element, shows) => {
  return {
    type: 'CURRENT',
    val: shows[element],
  }
}

export const setShows = arr => {
  return {
    type: 'SHOWS',
    val: arr,
  }
}

export const getDownloads = arr => {
  return {
    type: 'DOWNLOADS',
    val: arr
  }
}

export const setDownloading = (title, setTo, downloading) => {
  const downloading_clone = JSON.parse(JSON.stringify(downloading));
  const out = compDownloading(title, setTo, downloading_clone);

  return {
    type: 'SET_DOWNLOADING',
    val: out
  }
}

export const removeDownloads = (title, downloads_input) => {
  let downloads = JSON.parse(JSON.stringify(downloads_input));

  const index = downloads.map(function(el) {
    return el.title;
  }).indexOf(title)

  downloads.splice(index, 1);

  if (index > 0) {
    return {
      type: 'REMOVE_DOWNLOADS',
      val: downloads
    }
  }
}

export const setUser = (obj) => {
  return {
    type: 'SET_USER',
    val: obj,
  }
}

export const setPlaying = (obj) => {
  return {
    type: 'SET_PLAYING',
    val: obj,
  }
}

export const setSound = (sound) => {
  return {
    type: 'SET_SOUND',
    val: sound,
  }
}

export const setDuration = (num) => {
  return {
    type: 'SET_DURATION',
    val: num,
  }
}

export const setSearching = (seconds) => {
  return {
    type: 'SET_SEARCHING',
    val: seconds,
  }
}

export const setChecked = (arr) => {
  return {
    type: 'SET_CHECKED',
    val: arr,
  }
}

//TODO: implement lodash for deep cloning