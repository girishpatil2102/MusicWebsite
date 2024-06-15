console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let Music = [
    {songName: "Bekhayali", filePath: "Music/1.mp3", coverPath: "images/cover.png"},
    {songName: "Heeriye", filePath: "Music/2.mp3", coverPath: "images/cover.png"},
    {songName: "Khairiyat", filePath: "Music/3.mp3", coverPath: "images/cover.png"},
    {songName: "O Mahi ", filePath: "Music/4.mp3", coverPath: "images/cover.png"},
    {songName: "O Sajni Re", filePath: "Music/5.mp3", coverPath: "images/cover.png"},
    {songName: "Pachtaoge", filePath: "Music/6.mp3", coverPath: "images/cover.png"},
    {songName: "Shayad", filePath: "Music/7.mp3", coverPath: "images/cover.png"},
    {songName: "Thodi Jagah", filePath: "Music/8.mp3", coverPath: "images/cover.png"},
    {songName: "Tujhe Kitna Chahne Lage", filePath: "Music/9.mp3", coverPath: "images/cover.png"},
    {songName: "Tum Kya Mile", filePath: "Music/10.mp3", coverPath: "images/cover.png"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = Music[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = Music[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Music/${songIndex+1}.mp3`;
        masterSongName.innerText = Music[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Music/${songIndex+1}.mp3`;
    masterSongName.innerText = Music[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Music/${songIndex+1}.mp3`;
    masterSongName.innerText = Music[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

