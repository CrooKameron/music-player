const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const paly = document.querySelector("#controls #paly");
const next = document.querySelector("#controls #next");

const player = new musicPlayer(musicList);





window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
})
 

function displayMusic(music){
    title.innerText = music.title;
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}