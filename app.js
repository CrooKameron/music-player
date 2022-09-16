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
const ul = document.querySelector("ul");

const player = new musicPlayer(musicList);





window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
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
    isPlayingNow();
});

prev.addEventListener("click", () => { prevMusic(); isPlayingNow(); });

next.addEventListener("click", () => { nextMusic(); isPlayingNow();});

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
    };
});


const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {
        let liTag = 
        `<li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].getName()}</span>
            <span id="music-${i}" class="badge bg-primary rounded-pill">3:40</span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li>`;

        ul.insertAdjacentHTML("beforeend",liTag); 

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);
        

        liAudioTag.addEventListener("loadeddata",()=>{
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        })

    };

};

const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlayingNow();
}

const isPlayingNow = () => {
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")) {
            li.classList.remove("playing");
        };
        if (li.getAttribute("li-index") == player.index){
            li.classList.add("playing");
        };
    };
};


audio.addEventListener("ended", () =>{
    nextMusic();
    isPlayingNow();
});