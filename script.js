const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


/**songs library */
const songs = [
    '21_Savage_ft_Young_Thug_Gunna_-_Emergency_360media.com.ng',
    'Alan-Walker-Ava-Max-Alone-Pt-II',
    'ArrDee-Flowers-Say-My-Name',
    'Billie_Eilish_Ft_Khalid_-_Lovely',
    'Chainsmokers_Coldplay_-_Just_Like_This_CeeNaija.com_',
    'Dax-Book-Of-Revelations',
    'French_Montana_ft_Swae_lee_-_Unforgettable',
    'Koffee_-_The_Harder_They_Fall',
    'Kygo-Selena-Gomez-It-Aint-Me',
    'Meek-Mill-Bad-For-You',
    'The_Weekend_-_Save_Your_Tears',
    'Zayn_-_Dusk_Till_Dawn_Ft_Sia'
];

const images = [
  './img container/21 savage.jpg',
  './img container/alan.jpg',
  './img container/arrdee.jpg',
  './img container/billie.jpg',
  './img container/chain.jpg',
  './img container/dax.jpg',
  './img container/french montana.jpg',
  './img container/koffee.jpg',
  './img container/kygo.jpeg',
  './img container/meek.jpg',
  './img container/the weekend.jpg',
  './img container/zayn.jpg'
]

/**song index */
let songIndex = 0;

/**load the songs into the page */
loadSong(songs[songIndex], images[songIndex]);

function loadSong(song, pics) {
  title.innerText = song;
  audio.src = `library/${song}.mp3`;
  cover.src = pics;
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

    loadSong(songs[songIndex], images[songIndex]);

    playSong();
}
/**next song */
function nextSong() {
    songIndex++;
  
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  
    loadSong(songs[songIndex], images[songIndex]);
  
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