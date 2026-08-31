const audioPlayer = document.getElementById("audioPlayer");

const playPauseBtn = document.getElementById("playPauseBtn");

const nextBtn = document.getElementById("nextBtn");

const previousBtn = document.getElementById("previousBtn");

const shuffleBtn = document.getElementById("shuffleBtn");


// ================= PROGRESS ELEMENTS =================

const progressBar = document.querySelector(".progress_bar");

const currentTime = document.querySelector(".curr_time");

const totalTime = document.querySelector(".tot_time");


// ================= PLAYER INFORMATION =================

const playerImage = document.getElementById("playerImage");

const playerTitle = document.getElementById("playerTitle");

const playerArtist = document.getElementById("playerArtist");


// ================= SONG LIST =================

const songs = [

    {
        title: "Dabang-2",
        artist: "Dabang-2 Artist",
        song: "Assets/Dabang-2.mp3",
        image: "Assets/dabang.jpg"
    },

    {
        title: "Himalya Putra",
        artist: "Himalya",
        song: "Assets/Himalya Putra.mp3",
        image: "Assets/audio.jpg"
    },

    {
        title: "Tu Mileya",
        artist: "Darshan Raval",
        song: "Assets/Tu Mileya.mp3",
        image: "Assets/darshan.jpg"
    },

    {
        title: "Back2-Love",
        artist: "Rahat Fateh Ali Khan",
        song: "Assets/Back2-Love.mp3",
        image: "Assets/rahat.jpg"
    },

    {
        title: "Saiyaara",
        artist: "Tanishk Bagchi",
        song: "Assets/songs.mp3",
        image: "Assets/saiayara.jpg"
    }

];


// ================= CURRENT SONG =================

let currentSongIndex = 0;

let isShuffleOn = false;


// ================= LOAD SONG =================

function loadSong(index, shouldPlay = false) {

    const song = songs[index];

    audioPlayer.src = song.song;

    playerImage.src = song.image;

    playerTitle.textContent = song.title;

    playerArtist.textContent = song.artist;


    // Reset progress

    progressBar.value = 0;

    currentTime.textContent = "00:00";

    totalTime.textContent = "00:00";


    if (shouldPlay) {

        audioPlayer.play();

        playPauseBtn.classList.remove("fa-circle-play");

        playPauseBtn.classList.add("fa-circle-pause");

    }

}


// ================= PLAY / PAUSE =================

playPauseBtn.addEventListener("click", function () {

    if (audioPlayer.paused) {

        audioPlayer.play();

        playPauseBtn.classList.remove("fa-circle-play");

        playPauseBtn.classList.add("fa-circle-pause");

    }

    else {

        audioPlayer.pause();

        playPauseBtn.classList.remove("fa-circle-pause");

        playPauseBtn.classList.add("fa-circle-play");

    }

});


// ================= SONG DURATION =================

audioPlayer.addEventListener("loadedmetadata", function () {

    totalTime.textContent =
        formatTime(audioPlayer.duration);

});


// ================= SONG PROGRESS =================

audioPlayer.addEventListener("timeupdate", function () {

    currentTime.textContent =
        formatTime(audioPlayer.currentTime);


    if (!isNaN(audioPlayer.duration)) {

        const remainingTime =
            audioPlayer.duration - audioPlayer.currentTime;


        totalTime.textContent =
            formatTime(remainingTime);


        progressBar.value =
            (audioPlayer.currentTime /
             audioPlayer.duration) * 100;

    }

});


// ================= PROGRESS BAR CONTROL =================

progressBar.addEventListener("input", function () {

    if (!isNaN(audioPlayer.duration)) {

        audioPlayer.currentTime =
            (progressBar.value / 100) *
            audioPlayer.duration;

    }

});


// ================= FORMAT TIME =================

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;

}


// ================= CARD CLICK =================

const cards =
    document.querySelectorAll(".card");


cards.forEach(function (card) {

    const songPath =
        card.getAttribute("data-song");


    if (!songPath) {

        return;

    }


    card.addEventListener("click", function () {

        const index =
            songs.findIndex(function (song) {

                return song.song === songPath;

            });


        if (index !== -1) {

            currentSongIndex = index;

            loadSong(currentSongIndex, true);

        }

    });

});


// ================= NEXT SONG =================

// ================= NEXT SONG =================

nextBtn.addEventListener("click", function () {

    if (isShuffleOn) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(Math.random() * songs.length);

        } while (
            randomIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;

        }

    }

    loadSong(currentSongIndex, true);

});

// ================= PREVIOUS SONG =================

previousBtn.addEventListener("click", function () {

    currentSongIndex--;


    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;

    }


    loadSong(currentSongIndex, true);

});


// ================= AUTO NEXT =================

// ================= AUTO NEXT =================

audioPlayer.addEventListener("ended", function () {

    if (isShuffleOn) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(Math.random() * songs.length);

        } while (
            randomIndex === currentSongIndex &&
            songs.length > 1
        );

        currentSongIndex = randomIndex;

    } else {

        currentSongIndex++;

        if (currentSongIndex >= songs.length) {

            currentSongIndex = 0;

        }

    }

    loadSong(currentSongIndex, true);

});


// ================= VOLUME =================

const volumeBar =
    document.querySelector(".range");


audioPlayer.volume = 0.5;


volumeBar.addEventListener("input", function () {

    audioPlayer.volume =
        Number(volumeBar.value) / 100;

});


// ================= SHUFFLE =================

shuffleBtn.addEventListener("click", function () {

    isShuffleOn = !isShuffleOn;

    if (isShuffleOn) {

        shuffleBtn.style.color = "#1db954";

    } else {

        shuffleBtn.style.color = "";

    }

});

// ================= SPACEBAR =================

document.addEventListener("keydown", function (event) {

    // Agar input/range par focus hai
    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {
        return;
    }


    // ================= SPACE =================

    if (event.code === "Space") {

        event.preventDefault();

        if (audioPlayer.paused) {

            audioPlayer.play();

            playPauseBtn.classList.remove("fa-circle-play");
            playPauseBtn.classList.add("fa-circle-pause");

        } else {

            audioPlayer.pause();

            playPauseBtn.classList.remove("fa-circle-pause");
            playPauseBtn.classList.add("fa-circle-play");

        }

    }


    // ================= KEYBOARD NEXT =================

    if (event.code === "ArrowRight") {

        event.preventDefault();

        if (isShuffleOn) {

            let randomIndex;

            do {

                randomIndex =
                    Math.floor(Math.random() * songs.length);

            } while (
                randomIndex === currentSongIndex &&
                songs.length > 1
            );

            currentSongIndex = randomIndex;

        } else {

            currentSongIndex++;

            if (currentSongIndex >= songs.length) {
                currentSongIndex = 0;
            }

        }

        loadSong(currentSongIndex, true);

    }


    // ================= KEYBOARD PREVIOUS =================

    // ================= KEYBOARD PREVIOUS =================

    if (event.code === "ArrowLeft") {

        event.preventDefault();

        if (isShuffleOn) {

            let randomIndex;

            do {

                randomIndex =
                    Math.floor(Math.random() * songs.length);

            } while (
                randomIndex === currentSongIndex &&
                songs.length > 1
            );

            currentSongIndex = randomIndex;

        } else {

            currentSongIndex--;

            if (currentSongIndex < 0) {

                currentSongIndex = songs.length - 1;

            }

        }

        loadSong(currentSongIndex, true);

    }
});
