const express = require("express");
const app = express();

app.use(express.json());

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 },
];

app.get("/", (req, res) => {
  res.send("Ok ");
});

app.listen(5000, () => {
  console.log("running the server ");
});

app.get("/test", (req, res) => {
  res.send({ status: 200, message: "ok" });
});

app.get('/time', (req, res) => {
  const currentDate = new Date();
  res.send({ status: 200, message: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}` });
});

app.get('/hello/:id?', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: 200, message: `Hello, ${id}` });
});

app.get('/search', (req, res) => {
  const { s } = req.query;
  if (s) res.status(200).json({ status: 200, message: 'ok', data: s });
  else res.status(500).json({ status: 500, error: true, message: 'You have to provide a search' });
});

app.post('/movies/add', (req, res) => {
  const { title: NewTitle, year: NewYear, rating: NewRating = 4 } = req.body;
  if (!NewTitle || !NewYear || isNaN(NewYear) || NewYear.toString().length !== 4)
    res.status(403).json({ status: 403, error: true, message: 'You cannot create a movie without providing a title and a valid year' });
  else {
    const newmovie = { title: NewTitle, year: NewYear, rating: NewRating };
    movies.push(newmovie);
    res.status(200).json(movies);
  }
});

app.delete('/movies/delete/:id', (req, res) => {
  const { id } = req.params;
  if (id > movies.length || id < 1) res.status(404).json({ status: 404, error: true, message: `The movie ${id} does not exist` });
  else {
    movies.splice(id - 1, 1);
    res.status(200).json(movies);
  }
});

app.put("/movies/update/:id", (req, res) => {
  const id = parseInt(req.params.id) - 1;
  const { title: EditedTitle, year: EditedYear, rating: EditedRate } = req.body;
  if (movies[id] === undefined) res.status(404).send({ status: 404, error: true, message: `the movie ${id + 1} does not exist` });
  if (EditedRate && (EditedRate < 0 || EditedRate > 10)) res.status(400).send({ status: 400, error: true, message: 'Rating must be a number less than 10' });
  if (EditedTitle) movies[id].title = EditedTitle;
  if (EditedYear) movies[id].year = EditedYear;
  if (EditedRate) movies[id].rating = EditedRate;
  res.status(200).send({ status: 200, data: movies });
});

app.get('/movies/read', (req, res) => {
  res.status(200).json({ status: 200, data: movies });
});

app.get('/movies/read/by-date', (req, res) => {
  const sortedMovies = [...movies].sort((a, b) => a.year - b.year);
  res.status(200).json({ status: 200, data: sortedMovies });
});

app.get('/movies/read/by-rating', (req, res) => {
  const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
  res.status(200).json({ status: 200, data: sortedMovies });
});

app.get('/movies/read/by-title', (req, res) => {
  const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).json({ status: 200, data: sortedMovies });
});

app.get('/movies/read/id/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies[id - 1];
  if (movie) res.status(200).json({ status: 200, data: movie });
  else res.status(404).json({ status: 404, error: true, message: `The movie ${id} does not exist` });
});
