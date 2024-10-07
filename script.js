// Define the API key to access the OMDB API
const apiKey = '8f0d0582';

// Get the search input element from the HTML by its ID
const searchInput = document.getElementById('search-input');

// Get the movie list container element from the HTML by its ID where movie results will be displayed
const movieList = document.getElementById('movie-list');

// Add an event listener for 'keyup' event on the search input field to detect when the user types
searchInput.addEventListener('keyup', function() {
    // Store the user's input query
    const query = searchInput.value; 
    // If the input is not empty, fetch movies matching the query
    if (query) { 
        // Call the fetchMovies function with the user's query
        fetchMovies(query); 
    } else {
        movieList.innerHTML = ''; // If the input is empty, clear the movie list
    }
});

// Function to fetch movies from the OMDB API based on the user's search query
function fetchMovies(query) {
    // Fetch the data from OMDB API by dynamically inserting the query and API key into the URL
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(response => response.json()) // Convert the response into JSON format
        .then(data => {
            // Check if the API returned valid results
            if (data.Response === "True") { 
                // If valid, pass the search results to displayMovies function
                displayMovies(data.Search); 
            } else {
                movieList.innerHTML = '<p>No movies found.</p>'; // If no movies are found, display this message
            }
        });
}

// Function to display the list of movies returned by the API
function displayMovies(movies) {
    // Clear the existing movie list before displaying new results
    movieList.innerHTML = ''; 
    // Loop through each movie in the results
    movies.forEach(movie => { 
        // Create a new div element for each movie
        const movieCard = document.createElement('div');
        // Add a class to style the movie card 
        movieCard.classList.add('movie-card'); 
        // Set the innerHTML of the movie card with movie details and an Add to Favorites button
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}"> <!-- Display movie poster -->
            <h3>${movie.Title}</h3> <!-- Display movie title -->
            <p>${movie.Year}</p> <!-- Display the release year -->
            <button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button> <!-- Add to favorites button -->
            
            <a href="movie.html?id=${movie.imdbID}" class="more-info">More Info</a> <!-- Link to the movie details page -->
        `;
        movieList.appendChild(movieCard); // Append the movie card to the movie list in the DOM
    });
}

// Function to add a movie to the list of favorite movies using localStorage
function addToFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Retrieve current favorites from localStorage or initialize an empty array
    if (!favorites.includes(imdbID)) { // Check if the movie is not already in the favorites list
        favorites.push(imdbID); // Add the movie's IMDb ID to the favorites array
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Store the updated favorites list in localStorage
        alert('Movie added to favorites'); // Show an alert message to confirm the movie has been added
    }
}
