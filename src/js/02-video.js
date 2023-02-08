import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('#vimeo-player');
const player = new Player(iframeRef);
const VIDEO_STORAGE_KEY = 'videoplayer-current-time';
const currentPlayerTime = localStorage.getItem(VIDEO_STORAGE_KEY);

const onPlay = ({ seconds }) => {
  localStorage.setItem(VIDEO_STORAGE_KEY, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

setCurrentTimeOnPlayer();

function setCurrentTimeOnPlayer() {
  if (currentPlayerTime) {
    player.setCurrentTime(currentPlayerTime);
  }
}
