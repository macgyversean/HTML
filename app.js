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

  function LyricsFnc(e) {
    lyrics1.textContent = e.target.value;
  }
  function ArtistName(e) {
    artistName.textContent = e.target.value;
  }

  lyrs.appendChild(hello);

  function callUrl({ artistName, song }) {
    const url = `https://api.lyrics.ovh/v1/${artistName}/${song}`;
    fetch(url, {
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
        return data.lyrics;
      });
  }

  SearchLyr.addEventListener("click", () =>
    callUrl({ artistName: artistName.value, song: lyrics1.value })
  );

  function showMusicLyrics(data) {
    const { lyrics } = data;
    lyrs.innerHTML = `<pre>${lyrics}</pre>`;
    console.log(lyrs);
  }
  console.log(lyrics1);
  console.log(SearchLyr);
  console.log(hello);
});
