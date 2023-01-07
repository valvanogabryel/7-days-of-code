import { getPopularMovies, getMovieByName } from "./get-movies.js";

const pageTitle = document.querySelector('[data-page-title]');

const movieSection = document.querySelector('[data-movie-section]');
const searchElement = document.querySelector('[data-search]');
const formElement = document.querySelector('[data-form]');
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    searchMovie();
})
// const checkbox = document.getElementById('onlyFavorites');

let isFavorite = false;

window.addEventListener('load', async () => {
    let movies = await getPopularMovies();
    movies.forEach(movie => { configMovie(movie) })
})

function configMovie(movie) {
    const { poster_path, title, vote_average, release_date, overview } = movie;
    const releaseYear = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`

    renderMovie(image, title, releaseYear, vote_average, overview);


}


function renderMovie(image, title, releaseYear, rating, overview) {
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
                        <button class="movie__card--favorite unchecked" data-favorite-button>Favoritar</button>
                         </div>
                    </div>
                     <p class="movie__card--description">${overview}</p>
                </div>
`
    movieSection.appendChild(movieElement);

    movieElement.querySelectorAll('[data-favorite-button]').forEach(button => {
        button.addEventListener('click', (event) => {
            handleFavoriteButton(event.currentTarget)
        })
    })
}

async function searchMovie() {
    const searchValue = searchElement.value;
    if (searchValue != '') {
        clearMovies();
        let movies = await getMovieByName(searchValue);
        pageTitle.innerHTML = `Resultados de acordo com a pesquisa: ${searchValue}`
        movies.forEach(movie => { configMovie(movie) })
    } else {
        pageTitle.innerHTML = 'Campo de pesquisa vazio.'
        setTimeout(() => {
            pageTitle.innerHTML = `Busque algum filme.`
        }, 1000)
    }
}

function clearMovies() { document.querySelector('[data-movie-section]').innerHTML = '' };

function handleFavoriteButton(button, movie) {
    button.classList.toggle('unchecked');
    isFavorite = true;

    if (button.classList.contains('unchecked')) {
        isFavorite = false;
        console.log(isFavorite);
    }
}
