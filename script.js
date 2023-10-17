const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


/**songs library */
const songs = [
    'ArrDee-Flowers-Say-My-Name',
    'Billie_Eilish_Ft_Khalid_-_Lovely',
    'Zayn_-_Dusk_Till_Dawn_Ft_Sia_CeeNaija.com_'
];

/**song index */
let songIndex = 2;

/**load the songs into the page */
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `library/${song}.mp3`;
}

/**play and pause song */
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
  
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });
/**play song */
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
  
    audio.play();
  }
  /**pause song */
  function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
  
    audio.pause();
  }


/**prev and next song */
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
/**prev song */
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}
/**next song */
function nextSong() {
    songIndex++;
  
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
  }


/**Progress bars of the song */
audio.addEventListener('timeupdate', updateProgress);

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  progressContainer.addEventListener('click', setProgress);
  /**set progress function */
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }

/**when the song has ended */
  audio.addEventListener('ended', nextSong);