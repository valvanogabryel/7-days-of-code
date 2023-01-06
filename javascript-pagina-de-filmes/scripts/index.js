import getMovies from "./get-movies.js";

const movieSection = document.querySelector('[data-movie-section]');
//criar funcionalidade que pega o botão de favorito e troca o valor de isFavorite de 'false' para 'true'.

window.addEventListener('load', async () => {
    let movies = await getMovies();
    movies.forEach(movie => { configMovie(movie) })
})

function configMovie(movie) {
    const { poster_path, title, vote_average, release_date, overview, isFavorite = false } = movie;
    const releaseYear = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`
    renderMovie(image, title, releaseYear, vote_average, overview, isFavorite)
}

function renderMovie(image, title, releaseYear, rating, overview, isFavorite) {

    const movieElement = document.createElement('div');
    movieElement.className = 'movie__card';
    movieElement.dataset.card = '';
    movieElement.innerHTML =
        `
<img src="${image}" alt="${title} poster" class="movie__card--image">
                 <div class="movie__card--informations">
                    <div class="movie__card--info">
                         <h2 class="movie__card--title">${title} ${releaseYear}</h2>
                         <div class="movie__card--info--content">
                            <p class="movie__card--rating">${rating}</p>
                        <button class="${verifyFavorite(isFavorite)}" data-favorite-button>Favoritar</button>
                         </div>
                    </div>

                     <p class="movie__card--description">${overview}</p>
                </div>
`
    movieSection.appendChild(movieElement);

    const favoriteButtons = document.querySelectorAll('[data-favorite-button]');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            favoriteMovie(event.target)
        })

    })
}

function verifyFavorite(isFavorite) {
    if (isFavorite) {
        return 'movie__card--favorite-checked';
    } else {
        return 'movie__card--favorite-unchecked';
    }
}