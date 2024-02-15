   function doSearch(SearchQuery) {
      get(`${apiUrl}&${SearchQuery}`).then(function (data) {
        console.log("Search Results", data);
      });
    }

    function showArtist(artistName) {
      const page = document.createElement("p");
      page.textContent = artistName;
      root.appendChild(page);
    }
  get(url).then(function (data) {
    const { releases } = data;
    console.groupCollapsed(data);
    releases.map(function (release) {
      const { title } = release;
      const paragraph = document.createElement("p");
      paragraph.textContent = title;
      root.appendChild(paragraph);
    });
  });

  add an IIFE imediately invoked function expression
    (function () {
      get(`https://api.discogs.com/artists/${artistIdInput.textContent}`).then(
        function (data) {
          const { name, releases_url } = data;
          showArtist(name);
          getReleases(releases_url);
        }
      );
    })();

