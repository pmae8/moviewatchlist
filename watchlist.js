const watchlistContainer = document.getElementById("watchlist");

function renderWatchlist() {
    watchlistContainer.innerHTML = "";
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (watchlist.length > 0) {
        watchlist.forEach(movie => {
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

            const removeFromWatchlistBtn = document.createElement("button");
            removeFromWatchlistBtn.textContent = "➖Remove";
            removeFromWatchlistBtn.addEventListener("click", () => {
                removeFromLocalStorage(movie.imdbID);
                renderWatchlist();
            });
            actions.appendChild(removeFromWatchlistBtn);

            details.appendChild(actions);
            movieItem.appendChild(details);

            watchlistContainer.appendChild(movieItem);
        });
    } else {
        watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
    }
}

renderWatchlist();

function removeFromLocalStorage(imdbID) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}