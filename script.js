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
const loopButton = document.getElementById("loopButton");

// ==========================
// Songs
// ==========================

const songs = [
    {
        songName: "Warriyo - Mortals",
        filePath: "songs/song1.mp3",
        coverPath: "covers/1.jpg"
    },
    {
        songName: "Cielo - Huma Huma",
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

function loadSong(index) {

    songIndex = index;

    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;

    masterSongName.innerText = songs[index].songName;

}

loadSong(songIndex);

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

btns.forEach((btn, index) => {

    btn.addEventListener("click", () => {

        if (songIndex === index && !audioElement.paused) {

            audioElement.pause();
            return;

        }

        makeAllPlays();

        loadSong(index);

        audioElement.play();

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

    if (audioElement.duration) {

        let progress = parseInt(
            (audioElement.currentTime / audioElement.duration) * 100
        );

        myProgressBar.value = progress;

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

        audioElement.play();

    }

});

// ==========================
// Loop Button
// ==========================

let isLoop = false;

loopButton.addEventListener("click", () => {

    isLoop = !isLoop;

    audioElement.loop = isLoop;

    loopButton.classList.toggle("active");

});