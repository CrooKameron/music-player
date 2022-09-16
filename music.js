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
    new Music("Blinding lights","The Weekend","1.jpeg","1.mp3"),
    new Music("bu da mi gecer sevgilim","Doja Cat","2.jpeg","2.mp3"),
    new Music("Little Dark Age","MGMT","3.jpeg","3.mp3")
]