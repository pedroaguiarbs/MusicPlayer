const musics = [
  {
    title: "A Sky Full of Stars",
    artist: "Coldplay",
    src: "./music/Coldplay - A sky of full stars.mpeg",
    img: "./images/coldplay.jpeg",
  },
  {
    title: "Só tu és Santo",
    artist: "Morada",
    src: "./music/moradaSTS.mp3",
    img: "./images/morada.jpeg",
  },
  {
    title: "You Get What You Give",
    artist: "New Radicals",
    src: "./music/radical.mp3",
    img: "./images/radicals.jpeg",
  },
];

let indexMusic = 0;

let isPlaying = false;

const music = document.querySelector("audio");
const musicDuration = document.querySelector(".end-music");
const musicImage = document.querySelector("img");
const musicName = document.querySelector(".description h2");
const artistName = document.querySelector(".description i");

musicRender(indexMusic);

// Adicionando Eventos
document.querySelector(".play-button").addEventListener("click", playMusic);
document.querySelector(".pause-button").addEventListener("click", pauseMusic);
music.addEventListener("timeupdate", updateBar);
document.querySelector(".back-button").addEventListener("click", () => {
  indexMusic--;
  if (indexMusic < 0) {
    indexMusic = musics.length - 1;
  }
  musicRender(indexMusic);
});
document.querySelector(".next-button").addEventListener("click", () => {
  indexMusic++;
  if (indexMusic >= musics.length) {
    indexMusic = 0;
  }
  musicRender(indexMusic);
});

// Adicionando Funções
function musicRender(index) {
  music.setAttribute("src", musics[index].src);
  music.addEventListener("loadeddata", () => {
    musicName.textContent = musics[index].title;
    artistName.textContent = musics[index].artist;
    musicImage.src = musics[index].img;
    musicDuration.textContent = secondsToMinutes(Math.floor(music.duration));

    // Verificar se a música está pausada e iniciar a reprodução se estiver tocando
    if (isPlaying) {
      playMusic();
    }
  });
}

function playMusic() {
  music.play();
  document.querySelector(".pause-button").style.display = "block";
  document.querySelector(".play-button").style.display = "none";
  isPlaying = true;
}

function pauseMusic() {
  music.pause();
  document.querySelector(".pause-button").style.display = "none";
  document.querySelector(".play-button").style.display = "block";
  isPlaying = false;
}

function updateBar() {
  const bar = document.querySelector(".w-full.h-1.bg-zinc-900");
  const indicator = document.querySelector(".w-5.h-5.bg-zinc-400");

  const progress = (music.currentTime / music.duration) * 100;

  // Calcula a posição da bolinha indicadora
  const indicatorPosition = (progress / 100) * bar.clientWidth;

  // Ajusta a posição da bolinha indicadora usando transform e translateX
  indicator.style.left = `${indicatorPosition}px`;

  const elapsedTime = document.querySelector(".start-music");
  elapsedTime.textContent = secondsToMinutes(Math.floor(music.currentTime));
}

function secondsToMinutes(seconds) {
  let minutesField = Math.floor(seconds / 60);
  let secondsField = seconds % 60;
  if (secondsField < 10) {
    secondsField = "0" + secondsField;
  }

  return minutesField + ":" + secondsField;
}
