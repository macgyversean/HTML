"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Content Loaded");
  const lyrs = document.querySelector("#lyrics");
  const hello = document.createElement("h1");
  const SearchLyr = document.getElementById("SearchLyr");
  const artistName = document.getElementById("artistName");
  const lyrics1 = document.getElementById("lyrics1");
  artistName.addEventListener("input", ArtistName);
  lyrics1.addEventListener("input", LyricsFnc);
  console.log(artistName);
  console.log(lyrics1);

  function LyricsFnc(e) {
    lyrics1.textContent = e.target.value;
  }

  function ArtistName(e) {
    artistName.textContent = e.target.value;
  }
  lyrs.appendChild(hello);

  fetch("https://api.lyrics.ovh/v1/nf/hope", {
    method: "get",
    headers: {
      "User-Agent": "SeanCarroll/3.0",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showMusicLyrics(data);
      return data;
    });
  function showMusicLyrics(data) {
    const { lyrics } = data;
    lyrs.innerHTML = `<pre>${lyrics}</pre>`;

    // const page = document.createElement("p");
    // page.textContent = data.lyrics;
    // lyrs.appendChild(page);
    // console.log(page);
  }
});

// `<pre>${data.lyrics}</pre>`
