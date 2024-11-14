const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON

// array 
let movies = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', releaseYear: 2010, rating: 8.8 },
  { id: 2, title: 'The Dark Knight', genre: 'Action', releaseYear: 2008, rating: 9.0 },
  { id: 3, title: 'Interstellar', genre: 'Sci-Fi', releaseYear: 2014, rating: 8.6 }
];

// Return all movies
app.get('/', (req, res) => {
   res.send("<h1>Type '/' movies</h1>")
  });
  
app.get('/movies', (req, res) => {
  res.json(movies);
});

//  Return a specific movie by ID
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (movie) res.json(movie);
  else res.status(404).json({ message: 'Movie not found' });
});

//  Add a new movie
app.post('/movies', (req, res) => {
  const { title, genre, releaseYear, rating } = req.body;
  const newMovie = {
    id: movies.length ? movies[movies.length - 1].id + 1 : 1,
    title,
    genre,
    releaseYear,
    rating
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

//  Update the rating of a movie
app.patch('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: 'Movie not found' });

  if (req.body.rating !== undefined) {
    movie.rating = req.body.rating;
  }
  res.json(movie);
});

// Delete a movie by ID
app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' });

  const deletedMovie = movies.splice(movieIndex, 1);
  res.json(deletedMovie[0]);
});

//  server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
