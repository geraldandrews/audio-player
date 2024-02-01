let currentMusic = 0;

const audio = document.querySelector('#audio');
const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.song-name');
const artistName = document.querySelector('.artist-name');
const cover = document.querySelector('.cover-photo');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');

playBtn.addEventListener('click', () => {
    document.querySelector('.glow').classList.add('colors');
    if(playBtn.className.includes('pause')) {
        audio.play();
    } else {
        document.querySelector('.glow').classList.remove('colors');
        audio.pause();
    }
    playBtn.classList.toggle('pause');
    cover.classList.toggle('play');
});

// setup music
const setMusic = (i) => {
    seekBar.value = 0; // set range slide value to 0
    let song = songs[i];
    currentMusic = i;
    audio.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    cover.style.backgroundImage = `url('${song.cover}')`;

    currentTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = audio.duration;
        musicDuration.innerHTML = formatTime(audio.duration);
    }, 300);
}

setMusic(0);

// formatting time in min and seconds format
const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10) {
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

// seekbar 
setInterval(() => {
    seekBar.value = audio.currentTime;
    currentTime.innerHTML = formatTime(audio.currentTime);
    if(Math.floor(audio.currentTime) == Math.floor(seekBar.max)) {
        nextBtn.click();
    }
}, 500)

seekBar.addEventListener('change', () => {
    audio.currentTime = seekBar.value;
});

const playMusic = () => {
    audio.play();
    playBtn.classList.remove('pause');
    cover.classList.add('play');
}

// forward and backward buttons
nextBtn.addEventListener('click', () => {
    document.querySelector('.glow').classList.add('colors');
    if(currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
});

previousBtn.addEventListener('click', () => {
    document.querySelector('.glow').classList.add('colors');
    if(currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
});


