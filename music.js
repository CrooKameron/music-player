class Music {
    constructor(title,singer,img,file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName(){
        return this.title+" - "+this.singer
    }
}

const musicList = [
    new Music("bosver","nilufer","1.jpeg","1.mp3"),
    new Music("bu da mi gecer sevgilim","yalin","2.jpeg","2.mp3"),
    new Music("aramizda ucrumlar","suat sana","3.jpeg","3.mp3")
]