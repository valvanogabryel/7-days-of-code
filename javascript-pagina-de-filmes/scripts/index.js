import { getPopularMovies, getMovieByName } from "../services/get-movies.js";
import { favoriteItem, unfavoriteItem, getFavoriteMovies } from "../services/local-storage.js";

const pageTitle = document.querySelector('[data-page-title]');

const movieSection = document.querySelector('[data-movie-section]');

const checkmark = document.querySelector('#onlyFavorites');
checkmark.addEventListener('change', function () {
    if (this.checked) {
        clearMovies();
        const movies = getFavoriteMovies() || [];
        movies.forEach(movie => renderFavoriteMovies(movie));
    } else {
        clearMovies();
        resetPopular();
    }
})

const searchElement = document.querySelector('[data-search]');
const formElement = document.querySelector('[data-form]');
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    searchMovie();
})

async function resetPopular() {
    let movies = await getPopularMovies();
    movies.forEach(movie => { configMovie(movie) });
}

window.addEventListener('load', async () => {
    let movies = await getPopularMovies();
    movies.forEach(movie => configMovie(movie));
})

function configMovie(movie) {
    const { poster_path, title, vote_average, release_date, overview, id, isFavorite = false } = movie;
    const releaseYear = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`
    renderMovie(image, title, releaseYear, vote_average, overview, id, isFavorite);
}

function renderMovie(image, title, releaseYear, rating, overview, id, isFavorite) {
    let movies = [image, title, releaseYear, rating, overview, id, isFavorite];
    let favs = getFavoriteMovies() || [];
    for (let fav of favs) {
        if (movies[5] == fav[5]) {
            movies[6] = fav[6];
        }
    }

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
                        <button class="movie__card--favorite ${movies[6] === true ? '' : 'unchecked'}" data-favorite-button>Favoritar</button>
                         </div>
                    </div>
                     <p class="movie__card--description">${overview}</p>
                </div>
`
    movieSection.appendChild(movieElement);

    movieElement.querySelectorAll('[data-favorite-button]').forEach(button => {
        button.addEventListener('click', (event) => {
            handleFavoriteButton(event.currentTarget, movies, id);
        })
    })
}

function renderFavoriteMovies(favoriteMovie) {
    const favoriteMoviesElements = document.createElement('div');
    favoriteMoviesElements.className = 'movie__card';
    favoriteMoviesElements.dataset.card = '';
    favoriteMoviesElements.innerHTML =
        `
        <img src="${favoriteMovie[0]}" alt="${favoriteMovie[1]} poster" class="movie__card--image">
        <div class="movie__card--informations">
        <div class="movie__card--info">
        <h2 class="movie__card--title">${favoriteMovie[1]} ${favoriteMovie[2]}</h2>
        <div class="movie__card--info--content">
        <p class="movie__card--rating">${favoriteMovie[3]}</p>
        <button class="movie__card--favorite" data-favorite-button>Favoritar</button>
        </div>
        </div>
        <p class="movie__card--description">${favoriteMovie[4]}</p>
        </div>
        `
    movieSection.appendChild(favoriteMoviesElements);
}

async function searchMovie() {
    const searchValue = searchElement.value;
    if (searchValue != '') {
        clearMovies();

        let movies = await getMovieByName(searchValue);
        pageTitle.innerHTML = `Resultados de acordo com a pesquisa: ${searchValue}`;
        movies.forEach(movie => { configMovie(movie) });
    } else {
        pageTitle.innerHTML = 'Campo de pesquisa vazio.';
        setTimeout(() => {
            pageTitle.innerHTML = `Busque algum filme.`;
        }, 1000)
    }
}

function handleFavoriteButton(button, movie, id) {
    button.classList.toggle('unchecked');
    favoriteItem(movie, button);

    if (button.classList.contains('unchecked')) {
        unfavoriteItem(id, movie);
    }
}

function clearMovies() { document.querySelector('[data-movie-section]').innerHTML = '' };