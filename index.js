"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Content Loaded");

  const SearchB = document.getElementById("searchB");
  const artistIdInput = document.getElementById("artistId");
  const list = document.getElementById("myList");
  artistIdInput.addEventListener("input", updateValue);
  SearchB.addEventListener("click", getReleases);

  // Get the input field
  const input = document.getElementById("Searchb");

  // Execute a function when the user presses a key on the keyboard
  //   input.addEventListener("keypress", function (event) {
  //     // If the user presses the "Enter" key on the keyboard
  //     if (event.key === "Enter") {
  //       // Cancel the default action, if needed
  //       event.preventDefault();
  //       // Trigger the button element with a click
  //       document.getElementById("myBtn").click();
  //     }
  //   });

  function updateValue(e) {
    artistIdInput.textContent = e.target.value;
  }

  async function getReleases() {
    const artistName = artistIdInput.textContent;
    const token = "xdPpthHSMJYFKilnwZRtgwTRmciDXFvIqatyltto";
    const url = `https://api.discogs.com/database/search?token=${token}&artist=${artistName}`;
    await fetch(url, {
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
        results.reverse().map(function (result) {
          const { title } = result;
          const albumTitle = document.createElement("p");
          albumTitle.textContent = title;
          list.appendChild(albumTitle);
        });
      });
  }

  //   function doSearch(SearchQuery) {
  //     get(`${apiUrl}&${SearchQuery}`).then(function (data) {
  //       console.log("Search Results", data);
  //     });
  //   }

  //   function showArtist(artistName) {
  //     const page = document.createElement("p");
  //     page.textContent = artistName;
  //     root.appendChild(page);
  //   }
  // get(url).then(function (data) {
  //   const { releases } = data;
  //   console.groupCollapsed(data);
  //   releases.map(function (release) {
  //     const { title } = release;
  //     const paragraph = document.createElement("p");
  //     paragraph.textContent = title;
  //     root.appendChild(paragraph);
  //   });
  // });

  // add an IIFE imediately invoked function expression
  //   (function () {
  //     get(`https://api.discogs.com/artists/${artistIdInput.textContent}`).then(
  //       function (data) {
  //         const { name, releases_url } = data;
  //         showArtist(name);
  //         getReleases(releases_url);
  //       }
  //     );
  //   })();
});
