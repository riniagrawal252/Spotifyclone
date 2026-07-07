// ==========================
// Initialize Variables
// ==========================

let songIndex = 0;
let audioElement = new Audio();

const masterPlay = document.getElementById("masterPlay");
const masterPlayIcon = masterPlay.querySelector("i");

const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const masterSongName = document.getElementById("masterSongName");

const songItems = Array.from(document.getElementsByClassName("songItem"));
const btns = Array.from(document.getElementsByClassName("btn"));

const next_btn = document.getElementById("next");
const prev_btn = document.getElementById("previous");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

// ==========================
// Songs
// ==========================

const songs = [
    {
        songName: "Mor mukut sir kanan kundal-Meerabai bhajan",
        filePath: "songs/song1.mp3",
        coverPath: "covers/1.jpg"
    },
    {
        songName: "Yahi asha lekar ati hoon main - Bhajan",
        filePath: "songs/song2.mp3",
        coverPath: "covers/2.jpg"
    },
    {
        songName: "DEAF KEV - Invincible",
        filePath: "songs/song3.mp3",
        coverPath: "covers/3.jpg"
    },
    {
        songName: "Different Heaven - My Heart",
        filePath: "songs/song4.mp3",
        coverPath: "covers/4.jpg"
    },
    {
        songName: "Janji - Heroes Tonight",
        filePath: "songs/song5.mp3",
        coverPath: "covers/5.jpg"
    },
    {
        songName: "Rabba",
        filePath: "songs/song6.mp3",
        coverPath: "covers/6.jpg"
    },
    {
        songName: "Sakhiyaan",
        filePath: "songs/song7.mp3",
        coverPath: "covers/7.jpg"
    },
    {
        songName: "Bhula Dena",
        filePath: "songs/song8.mp3",
        coverPath: "covers/8.jpg"
    },
    {
        songName: "Tumhari Kasam",
        filePath: "songs/song9.mp3",
        coverPath: "covers/9.jpg"
    },
    {
        songName: "Na Jaana",
        filePath: "songs/song10.mp3",
        coverPath: "covers/10.jpg"
    }
];

// ==========================
// Load Songs into HTML
// ==========================

songItems.forEach((element, i) => {

    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;

});

// ==========================
// Functions
// ==========================

function makeAllPlays() {

    btns.forEach(btn => {

        btn.classList.remove("fa-pause-circle");
        btn.classList.add("fa-play-circle");

    });

}
function loadSong(index){

    songIndex=index;

    audioElement.pause();

    audioElement.src=songs[index].filePath;
    audioElement.load();
    audioElement.currentTime=0;

    masterSongName.innerText=songs[index].songName;

    highlightSong(index);
}

loadSong(songIndex);
audioElement.addEventListener("loadedmetadata", () => {
    duration.innerText = formatTime(audioElement.duration);
});

// ==========================
// Master Play
// ==========================

masterPlay.addEventListener("click", () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {

        audioElement.play();

    }

    else {

        audioElement.pause();

    }

});

// ==========================
// Song Buttons
// ==========================

songItems.forEach((element, i) => {

    element.querySelector("img").src = songs[i].coverPath;
    element.querySelector(".songName").innerText = songs[i].songName;

    const tempAudio = new Audio();

    tempAudio.src = songs[i].filePath;

    tempAudio.addEventListener("loadedmetadata", () => {

        element.querySelector(".songTime").innerHTML =
            `${formatTime(tempAudio.duration)}
            <i class="far fa-play-circle btn"></i>`;

    });

});

// ==========================
// Audio Play Event
// ==========================

audioElement.addEventListener("play", () => {

    masterPlayIcon.classList.remove("fa-play-circle");
    masterPlayIcon.classList.add("fa-pause-circle");

    gif.style.opacity = 1;

    makeAllPlays();

    btns[songIndex].classList.remove("fa-play-circle");
    btns[songIndex].classList.add("fa-pause-circle");

});

// ==========================
// Audio Pause Event
// ==========================

audioElement.addEventListener("pause", () => {

    masterPlayIcon.classList.remove("fa-pause-circle");
    masterPlayIcon.classList.add("fa-play-circle");

    gif.style.opacity = 0;

    makeAllPlays();

});

// ==========================
// Progress Bar
// ==========================

audioElement.addEventListener("timeupdate", () => {

    if (!isNaN(audioElement.duration)) {

        let progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;

        document.getElementById("currentTime").innerText =
            formatTime(audioElement.currentTime);

        document.getElementById("duration").innerText =
            formatTime(audioElement.duration);
    }

});

myProgressBar.addEventListener("input", () => {

    if (audioElement.duration) {

        audioElement.currentTime =
            (myProgressBar.value * audioElement.duration) / 100;

    }

});

// ==========================
// Next Button
// ==========================

next_btn.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong(songIndex);
    audioElement.addEventListener("loadedmetadata", () => {
    duration.innerText = formatTime(audioElement.duration);
});

    audioElement.play();

});

// ==========================
// Previous Button
// ==========================

prev_btn.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);
    audioElement.addEventListener("loadedmetadata", () => {
    duration.innerText = formatTime(audioElement.duration);
});

    audioElement.play();

});

// ==========================
// Auto Next Song
// ==========================

audioElement.addEventListener("ended", () => {

    if (!audioElement.loop) {

        songIndex++;

        if (songIndex >= songs.length) {

            songIndex = 0;

        }

        loadSong(songIndex);
        audioElement.addEventListener("loadedmetadata", () => {
    duration.innerText = formatTime(audioElement.duration);
});

        audioElement.play();

    }

});

// ==========================
// Loop Button
// ==========================


function formatTime(time) {

    if (isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
const likeBtn = document.getElementById("likeBtn");

likeBtn.addEventListener("click",()=>{

    likeBtn.classList.toggle("liked");

    if(likeBtn.classList.contains("liked")){

        likeBtn.classList.remove("fa-regular");
        likeBtn.classList.add("fa-solid");

    }

    else{

        likeBtn.classList.remove("fa-solid");
        likeBtn.classList.add("fa-regular");

    }

});
function highlightSong(index){

    songItems.forEach(item=>{
        item.classList.remove("active");
    });

    songItems[index].classList.add("active");

}