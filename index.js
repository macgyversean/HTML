"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Content Loaded");

  const SearchB = document.getElementById("searchB");
  const artistIdInput = document.getElementById("artistId");
  const list = document.getElementById("myList");
  console.log(list);
  artistIdInput.addEventListener("input", updateValue);
  SearchB.addEventListener("click", getReleases);
  const root = document.getElementById("root");
  console.log(root);
  let songsForList = [];
  // Get the input field

  function updateValue(e) {
    artistIdInput.textContent = e.target.value;
  }

  async function getReleases() {
    const artistName = artistIdInput.textContent;
    const token = "xdPpthHSMJYFKilnwZRtgwTRmciDXFvIqatyltto";
    const url = `https://api.discogs.com/database/search?token=${token}&artist=${artistName}`;
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
        const { results } = data;
        console.log({ results });
        const list = document.createElement("ul");
        console.log(root);
        // Append it to the #root
        root.appendChild(list);
        results.map(function (result) {
          const { title, genre } = result;
          const albumTitle = document.createElement("p");
          albumTitle.textContent = title;
          const listItem = document.createElement("li");
          //create button
          const addToPlayListBTN = document.createElement("button");
          addToPlayListBTN.type = "button";
          addToPlayListBTN.textContent = "Add To Playlist";
          // Add the release title to the list item
          listItem.textContent = `${result.title} -  ${result.year}`;
          // Append the lisi item to the list
          listItem.appendChild(addToPlayListBTN);
          list.appendChild(listItem);
          addToPlayListBTN.addEventListener("click", function (e) {
            songsForList = [...songsForList, result.title];
            console.log(songsForList);
            showPlayList(songsForList);
          });
        });
      });
  }
  function showPlayList(songs) {
    const PlaylistElement = document.querySelector("#playlist");

    if (!PlaylistElement) {
      const newPlaylistElement = document.createElement("div");
      newPlaylistElement.id = "playlist";
      root.appendChild(newPlaylistElement);
      songs.map(function (song) {
        const songParagraphEl = document.createElement("p");
        songParagraphEl.textContent = song;
        newPlaylistElement.appendChild(songParagraphEl);
      });
    } else {
      let song = songsForList[0];
      if (songsForList.length >= 1) {
        song = songsForList[songsForList.length - 1];
      }
      const songParagraphEl = document.createElement("p");
      songParagraphEl.textContent = song;
      PlaylistElement.appendChild(songParagraphEl);
    }
  }
});
