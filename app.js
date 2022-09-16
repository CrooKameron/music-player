const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const paly = document.querySelector("#controls #paly");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");

const player = new musicPlayer(musicList);





window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});
 

function displayMusic(music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
};

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => { prevMusic(); });

next.addEventListener("click", () => { nextMusic(); });

const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
};

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
};

const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause(); 
};

const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
};

const calculateTime = (totalseconds) => {
    const minute = Math.floor(totalseconds / 60);
    const seconds = Math.floor(totalseconds % 60);
    const updatedseconds = seconds < 10 ? `0${seconds}` : `${seconds}`; 
    const output = `${minute}:${updatedseconds}`;
    return output;
};

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let soundState = "voice";

volume.addEventListener("click", () => {
    // let currentSoundLevel = volumeBar.value;
    if (soundState==="voice") {
        audio.muted = true;
        soundState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    } else {
        audio.muted = false;
        soundState = "voice";
        volume.classList = "fa-solid fa-volume-high";
    }
});


volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.value = value / 100;
    if (value == 0) {
        audio.muted = true;
        soundState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    } else {
        audio.muted = false;
        soundState = "voice";
        volume.classList = "fa-solid fa-volume-high";
    }
});