let filmList = document.getElementById("film-list");
const omdbApiKey = 'd64202a4'; // Ganti dengan API key Anda

let getFilmList = () => {
    let url = `https://www.omdbapi.com/?s=action&apikey=${omdbApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response == "True") {
                filmList.innerHTML = data.Search.map(movie => `
                    <div class="film-item">
                        <img src="${movie.Poster}" alt="${movie.Title}" class="poster">
                        <h3>${movie.Title} (${movie.Year})</h3>
                        <a href="detail.html?imdbID=${movie.imdbID}" class="btn-detail">Detail</a>
                    </div>
                `).join('');
            } else {
                filmList.innerHTML = `<p>${data.Error}</p>`;
            }
        })
        .catch(() => {
            filmList.innerHTML = `<p>Error occurred while fetching films.</p>`;
        });
};

// Cek apakah ada parameter pencarian di URL
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieName = urlParams.get('movie');

    if (!movieName) {
        getFilmList(); // Hanya panggil getFilmList jika tidak ada pencarian
    }
});
