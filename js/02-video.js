import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const player = new Player(iframe);

const timeFunction = data => {
  let playerSecond = data.seconds;
  localStorage.setItem('videoplayer-current-time', playerSecond);
};

player.on('timeupdate', throttle(timeFunction, 1000));

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function(seconds) {
    //seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name){
      case 'RangeError':
      // the time was less than 0 or grater than the video's duration
      break;

      default:

      break;
    }

  });

  player.on('timeupdate', handleTimeUpdate);

function handleTimeUpdate(data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }

  

  window.onload = () => {
    const savedTime = localStorage.getItem('videoplayer-current-time');
    if (savedTime) {
      player.setCurrentTime(savedTime).catch((error) => {
        if (error.name === 'RangeError') {
          console.error('The time could not be set on the player.', error);
        }
      });
    }
  };

