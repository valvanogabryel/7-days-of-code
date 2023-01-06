async function getMovies() {
    const url = 'https://api.themoviedb.org/3/movie/550?api_key=751799e0dc883576b6b755416df283ab';
    const response = await fetch(url);
    const movies = await response.json();
    return movies
}

console.log(getMovies());