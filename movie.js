// OMDB API key to access the movie data
const apiKey = '8f0d0582';

// Get the HTML element where the movie details will be displayed
const movieDetails = document.getElementById('movie-details');

// Retrieve the query parameters from the URL (e.g., the 'id' of the movie)
const params = new URLSearchParams(window.location.search);

// Extract the 'id' parameter (IMDb ID of the movie) from the URL
const movieID = params.get('id');

// Fetch movie details from the OMDB API using the IMDb ID
fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
    .then(response => response.json())  // Convert the API response to JSON
    .then(movie => {
        // Set the inner HTML of the 'movieDetails' element to display movie information
        movieDetails.innerHTML = `
            <h1>${movie.Title}</h1>  <!-- Movie title -->
            <img src="${movie.Poster}" alt="${movie.Title}">  <!-- Movie poster image -->
            <p><strong>Plot:</strong> ${movie.Plot}</p>  <!-- Movie plot -->
            <p><strong>Year:</strong> ${movie.Year}</p>  <!-- Movie release year -->
            <p><strong>Genre:</strong> ${movie.Genre}</p>  <!-- Movie genre -->
            <p><strong>Director:</strong> ${movie.Director}</p>  <!-- Movie director -->
        `;
    });
