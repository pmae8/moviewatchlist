const apiKey = "a9a94042";
const searchInput = document.getElementById("movie-search");
const searchButton = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");

searchButton.addEventListener("click", () => {
    const movieTitle = searchInput.value;
    fetchMovies(movieTitle);
});

function fetchMovies(title) {
    const url = `https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML = "";
            if (data.Search) {
                data.Search.forEach(movie => {
                    fetchMovieDetails(movie.imdbID);
                });
            } else {
                searchResults.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => {
            console.error(error);
            searchResults.innerHTML = "<p>Error fetching movies.</p>";
        });
}

function fetchMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(movie => {
            createMovieItem(movie);
        })
        .catch(error => console.error("Error fetching details:", error));
}

function createMovieItem(movie) {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const poster = movie.Poster;
    const img = document.createElement("img");
    img.src = poster !== "N/A" ? poster : "placeholder-image.jpg";
    img.alt = movie.Title;
    movieItem.appendChild(img);

    const details = document.createElement("div");
    details.classList.add("details");

    const title = document.createElement("h3");
    title.textContent = movie.Title;
    details.appendChild(title);

    const rated = document.createElement("p");
    rated.textContent = `Rated: ${movie.Rated}`;
    details.appendChild(rated);

    const runtime = document.createElement("p");
    runtime.textContent = `Runtime: ${movie.Runtime}`;
    details.appendChild(runtime);

        const genre = document.createElement("p");
    genre.textContent = `Genre: ${movie.Genre}`;
    details.appendChild(genre);

    const year = document.createElement("p");
    year.textContent = `Year: ${movie.Year}`;
    details.appendChild(year);

    const released = document.createElement("p");
    released.textContent = `Released: ${movie.Released}`;
    details.appendChild(released);

    const director = document.createElement("p");
    director.textContent = `Director: ${movie.Director}`;
    details.appendChild(director);

    const writer = document.createElement("p");
    writer.textContent = `Writer: ${movie.Writer}`;
    details.appendChild(writer);

    const actors = document.createElement("p");
    actors.textContent = `Actors: ${movie.Actors}`;
    details.appendChild(actors);

    const plot = document.createElement("p");
    plot.textContent = `Plot: ${movie.Plot}`;
    details.appendChild(plot);

    const rating = document.createElement("p");
    rating.classList.add("rating");
    let ratingsText = "";
    if (movie.Ratings && movie.Ratings.length > 0) {
        movie.Ratings.forEach(ratingObj => {
            ratingsText += `${ratingObj.Source}: ${ratingObj.Value}\n`;
        });
        rating.textContent = `Ratings:\n${ratingsText}`;
    } else {
        rating.textContent = "No ratings available.";
    }
    details.appendChild(rating);

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const addToWatchlistBtn = document.createElement("button");
    addToWatchlistBtn.textContent = "➕Watchlist";
    addToWatchlistBtn.addEventListener("click", () => {
        addToLocalStorage(movie);
    });
    actions.appendChild(addToWatchlistBtn);

    details.appendChild(actions);
    movieItem.appendChild(details);

    searchResults.appendChild(movieItem);
}

function addToLocalStorage(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.find(m => m.imdbID === movie.imdbID)) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${movie.Title} added to watchlist!`);
    } else {
        alert(`${movie.Title} is already in your watchlist!`);
    }
}
