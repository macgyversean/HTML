"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Content Loaded");

  const SearchB = document.getElementById("Searchb");
  const artistIdInput = document.getElementById("artistId");

  artistIdInput.addEventListener("input", updateValue);
  SearchB.addEventListener("click", callName);

  function updateValue(e) {
    artistIdInput.textContent = e.target.value;
  }

  function callName() {
    fetch(`https://api.discogs.com/artists/${artistIdInput.textContent}`, {
      method: "get",
      headers: {
        "User-Agent": "SeanCarroll/3.0",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        showArtist(data);
        return data;
      });
  }

  function showArtist(data) {
    console.log(data);
    const page = document.createElement("p");
    page.textContent = data.name;
    root.appendChild(page);
  }
});
