function favoriteItem(movie) {
    const movies = getFavoriteMovies() || [];
    movie[6] = true

    movies.push(movie);
    const moviesJSON = JSON.stringify(movies);
    localStorage.setItem('favoriteMovies', moviesJSON);

}

function unfavoriteItem(id, movie) {
    const movies = getFavoriteMovies() || [];
    movie[6] = false;

    const findMovie = movies.find(movie => movie[5] == id);
    const newMovies = movies.filter(movie => movie[5] != findMovie[5]);
    localStorage.setItem('favoriteMovies', JSON.stringify(newMovies));
}

function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies'));
}

export {
    favoriteItem,
    unfavoriteItem,
    getFavoriteMovies
}