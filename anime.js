let animeList = document.getElementById("anime-list");

let getAnimeList = () => {
    // Menggunakan Jikan API untuk mendapatkan daftar anime populer
    let url = `https://api.jikan.moe/v4/top/anime`;

    fetch(url)
        .then((response) => {
            // Periksa apakah respons berhasil
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            // Memastikan data diambil dengan benar
            if (data.data && data.data.length > 0) {
                animeList.innerHTML = data.data.map(anime => `
                    <div class="anime-item">
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="poster">
                        <h3>${anime.title} (${anime.year || 'Unknown Year'})</h3>
                        <p>Score: ${anime.score}</p>
                        <a href="animeDetail.html?id=${anime.mal_id}" class="btn-detail">Detail</a>
                    </div>
                `).join('');
            } else {
                animeList.innerHTML = `<p>No anime found.</p>`;
            }
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            animeList.innerHTML = `<p>Error occurred while fetching anime list: ${error.message}</p>`;
        });
};

// Panggil fungsi saat halaman dimuat
document.addEventListener("DOMContentLoaded", getAnimeList);
