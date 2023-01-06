async function getMovies() {
    const url = '';
    const response = await fetch(url);
    const movies = await response.json();
    return movies
}