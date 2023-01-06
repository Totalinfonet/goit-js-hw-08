import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

onReload();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(timeupdate) {
  const videoCurrentTime = timeupdate.seconds.toString();

  localStorage.setItem(LOCAL_STORAGE_KEY, videoCurrentTime);
}

function onReload() {
  const savedLocalStorageTime = Number(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (savedLocalStorageTime) {
    console.log(savedLocalStorageTime);
    player
      .setCurrentTime(savedLocalStorageTime)
      .then(function () {})
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            break;

          default:
            break;
        }
      });
  }
}
