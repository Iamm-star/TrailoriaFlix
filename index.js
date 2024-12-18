let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

const youtubeApiKey = 'AIzaSyB_3Ta4cdL3l7yW8GgjosPUSxAEvIqaeZA';
const key = 'd64202a4'; // Ganti dengan API key Anda



let getMovie = () => {
    let movieName = movieNameRef.value.trim();
    
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
        return;
    }

    result.innerHTML = `<h3 class="msg">Loading...</h3>`;
    let url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${key}`;

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            if (data.Response == "True") {
                result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                        <div class="cast">
                            <h3>Cast:</h3>
                            <p>${data.Actors}</p>
                        </div>
                    </div>
                </div>
                <div class="info-details">
                    <div class="plot">
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                    </div>
                </div>
                <h3>Trailer:</h3>
                <div id="trailer-container"></div>
                `;

                getTrailer(data.Title);
            } else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Error occurred</h3>`;
        });
};

let getTrailer = (movieTitle) => {
    let youtubeSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieTitle)}+trailer&type=video&key=${youtubeApiKey}`;

    fetch(youtubeSearchUrl)
        .then((response) => response.json())
        .then((data) => {
            let trailerContainer = document.getElementById("trailer-container");
            if (data.items.length > 0) {
                let videoId = data.items[0].id.videoId;
                trailerContainer.innerHTML = `
                    <div class="trailer-box">
                        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    </div>
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="trailer-btn">Watch Trailer</a>
                `;
            } else {
                trailerContainer.innerHTML = `<p>Trailer not found.</p>`;
            }
        })
        .catch((error) => {
            console.error('Error fetching YouTube data: ', error);
            document.getElementById("trailer-container").innerHTML = `<p>Trailer not found.</p>`;
        });
};

searchBtn.addEventListener("click", getMovie);
