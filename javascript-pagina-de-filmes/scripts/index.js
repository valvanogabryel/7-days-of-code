const movieSection = document.querySelector('[data-movie-section]');
let movies = [
    {
        image: 'img/movies----retirardps/filme1.svg',
        alt: 'batman',
        title: 'Batman (2022)',
        rating: 9.4,
        isFavorite: true,
        description: getDescription()
    },
    {
        image: 'img/movies----retirardps/filme2.svg',
        alt: 'avatar',
        title: 'Avatar (2009)',
        rating: 9.5,
        isFavorite: true,
        description: getDescription()
    },
    {
        image: 'img/movies----retirardps/filme3.svg',
        alt: 'vingadores ultimato',
        title: 'Avengers Endgame (2019)',
        rating: 9.2,
        isFavorite: false,
        description: getDescription()
    },
    {
        image: 'img/movies----retirardps/filme4.svg',
        alt: 'doutor estranho',
        title: 'Doctor Strange in the Multiverse of Madness',
        rating: 8.5,
        isFavorite: false,
        description: getDescription()
    }
]

movies.push({
    image: 'img/movies----retirardps/filme5.svg',
    alt: 'vingadores guerra infinita',
    title: 'Avengers Infinity War (2018)',
    rating: 9.6,
    isFavorite: true,
    description: getDescription()
})

movies.forEach(movie => {
    createMovie(movie.image, movie.alt, movie.title, movie.rating, movie.isFavorite, movie.description)
})



function createMovie(poster, alt, title, rating, isFavorite, description) {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie__card';
    movieElement.dataset.card = '';
    movieElement.innerHTML =
        `
    <img src="${poster}" alt="${alt}" class="movie__card--image">
                <div class="movie__card--informations">
                    <div class="movie__card--info">
                        <h2 class="movie__card--title">${title}</h2>
                        <div class="movie__card--info--content">
                            <p class="movie__card--rating">${rating}</p>
                            <p class="movie__card--favorite-${verifyFavorite(isFavorite)}">Favoritar</p>
                        </div>
                    </div>

                    <p class="movie__card--description">${description}</p>
                </div>
    `

    movieSection.appendChild(movieElement);
}

function verifyFavorite(isFavorite) {
    if (isFavorite) {
        return 'checked';
    } else {
        return 'unchecked';
    }
}

function getDescription() {
    return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
}





