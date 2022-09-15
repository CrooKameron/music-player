const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const paly = document.querySelector("#controls #paly");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");

const player = new musicPlayer(musicList);





window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
})
 

function displayMusic(music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
    prevMusic();
});

next.addEventListener("click", () => {
    nextMusic();
});

function prevMusic() {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function pauseMusic() {
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic() {
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
    audio.play();
}

const calculateTime = (totalseconds) => {
    const minute = Math.floor(totalseconds / 60);
    const seconds = Math.floor(totalseconds & 60);
    const updatedseconds = seconds < 10 ? `0${seconds}` : `${seconds}`; 
    const output = `${minute}:${updatedseconds}`;
    return output;
} 


audio.addEventListener("loadedmetadata",() => {
    // console.log(audio.duration) 
    duration.textContent = calculateTime(audio.duration);
})

