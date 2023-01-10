import { API_key } from './environment/key.js';
import API_key from './environment/key.js';

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_key}&language=pt-BR&page=1`;
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
}

async function getMovieByName(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_key}&query=${title}&language=pt-BR&page=1`;
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
}

export {
    getPopularMovies,
    getMovieByName
};