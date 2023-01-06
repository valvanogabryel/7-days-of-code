import { API_key } from '../environment/key.js';

async function getMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_key}&language=en-US&page=1`;
    const response = await fetch(url);
    const { results } = await response.json();
    return results;
}



export default getMovies;