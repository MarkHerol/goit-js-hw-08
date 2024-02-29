import Vimeo from 'vimeo-player';
import throttle from 'lodash.throttle';

const player = new Vimeo('your-video-element-id');
const savePlaybackTime = throttle((time) => {
    localStorage.setItem('videoplayer-current-time', time);
  }, 1000);
  
  player.on('timeupdate', (data) => {
    const currentTime = data.seconds;
    savePlaybackTime(currentTime);
  });

  localStorage.setItem('videoplayer-current-time', currentTime);