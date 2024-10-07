// Get the element where favorite movies will be displayed
const favoritesList = document.getElementById('favorites-list');

// API key to access the OMDB API
const apiKey = '8f0d0582';

// Retrieve favorite movies from localStorage, or initialize an empty array if none exist
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Loop through each IMDb ID in the favorites array
favorites.forEach(imdbID => {
    // Fetch movie details from the OMDB API using the movie's IMDb ID
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
        .then(response => response.json())  // Convert the API response to JSON
        .then(movie => {
            // Create a new div element for each favorite movie
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');  // Add 'movie-card' class for styling
            
            // Set the inner HTML of the movie card to display movie details
            movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">  <!-- Movie poster image -->
                <h3>${movie.Title}</h3>  <!-- Movie title -->
                <p>${movie.Year}</p>  <!-- Movie release year -->
                <button onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>  <!-- Button to remove the movie from favorites -->
            `;
            // Append the movie card to the favorites list in the DOM
            favoritesList.appendChild(movieCard);
        });
});

// Function to remove a movie from the favorites list
function removeFromFavorites(imdbID) {
    // Filter out the movie with the given IMDb ID from the favorites array
    favorites = favorites.filter(id => id !== imdbID);
    
    // Update localStorage with the new favorites list
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Reload the page to refresh the displayed favorites list
    window.location.reload();
}
