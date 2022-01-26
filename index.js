const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const mainEl = document.querySelector("main");
const nextButtonEl = document.querySelector(".btn-next");

const apiURL = "https://api.lyrics.ovh";

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  inputValue = inputEl.value;
  if (inputValue != "") {
    searchSong(inputValue);
  } else {
    alert("Please write artist or song name");
  }
});

async function searchSong(inputValue) {
  const response = await fetch(`${apiURL}/suggest/${inputValue}`);
  const dataObj = await response.json();
  showData(dataObj);
}

function showData(dataObj) {
  mainEl.innerHTML = `<ul class="list">
    ${dataObj.data
      .map((value) => {
        return `<li class="list-item">
        <div class="song-container">
          <strong class="artist-name">${value.artist.name}</strong>
          <span class="song-name">&mdash;${value.title}</span>
        </div>
        <button artist-name="${value.artist.name}" song-name= "${value.title}" class="btn btn-lyrics">Lyrics</button>
      </li>`;
      })
      .join(" ")}
  </ul>`;
  nextButtonEl.classList.remove("hide-btn");
}

mainEl.addEventListener("click", (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("artist-name");
    const sontName = clickedEl.getAttribute("song-name");
    getLyrics(artist, sontName);
  }
});

async function getLyrics(artist, songName) {
  const response = await fetch(`${apiURL}/v1/${artist}/${songName}`);
  const dataObj = await response.json();

  const lyrics = dataObj.lyrics.replace(/\r\n|\r|\n/g, "<br/>");

  mainEl.innerHTML = `<h2 class="heading-secondary">
    ${artist} &mdash; <span class="lyrics-song-name">${songName}</span>
  </h2>
  <p class="lyrics">${lyrics}</p>`;
  nextButtonEl.classList.add("hide-btn");
}
