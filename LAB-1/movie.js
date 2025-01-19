
let movieCollection = [
    {
        title: "Inception",
        genre: "Sci-Fi",
        rating: 9,
        year: 2010
    },
    {
        title: "The Shawshank Redemption",
        genre: "Drama",
        rating: 8,
        year: 1994
    },
    {
        title: "The Dark Knight",
        genre: "Action",
        rating: 7, 
        year: 2008
    },
    {
        title: "Interstellar",
        genre: "Sci-Fi",
        rating: 10,
        year: 2014
    },
];

// Function to add a new movie
const addMovie = () => {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = Number(document.getElementById('rating').value);
    const year = Number(document.getElementById('year').value);

    if (!title || !genre || !rating || !year) {
        alert('Please fill in all fields');
        return;
    }

    const newMovie = { title, genre, rating, year };
    movieCollection.push(newMovie);
    showAllMovies();
    clearForm();
};

// Function to clear the form
const clearForm = () => {
    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('year').value = '';
};

// Function to filter movies by genre
const filterByGenre = () => {
    const genre = document.getElementById('genreFilter').value.toLowerCase();
    const filteredMovies = movieCollection.filter(movie => 
        movie.genre.toLowerCase().includes(genre)
    );
    displayMovies(filteredMovies);
};

// Function to filter movies by year
const filterByYear = () => {
    const year = Number(document.getElementById('yearFilter').value);
    const filteredMovies = movieCollection.filter(movie => movie.year >= year);
    displayMovies(filteredMovies);
};

// Function to find highest rated movie
const findHighestRated = () => {
    const highestRated = movieCollection.reduce((prev, current) => 
        (prev.rating > current.rating) ? prev : current
    );
    displayMovies([highestRated]);
};

// Function to show all movies
const showAllMovies = () => {
    displayMovies(movieCollection);
};

// Function to display movies in the DOM
const displayMovies = (movies) => {
    const movieDisplay = document.getElementById('movieDisplay');
    movieDisplay.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Genre: ${movie.genre}</p>
            <p>Rating: ${movie.rating}/10</p>
            <p>Year: ${movie.year}</p>
        `;
        movieDisplay.appendChild(movieCard);
    });
};

// Initialize the display
showAllMovies();
