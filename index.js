// Making the app works with express
const express = require("express");
const port = 5000;
const app = express();

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 },
];
// when opennig the local it answers with ok
app.get("/", (req, res) => {
  res.send("Ok ");
});
app.listen(5000, () => {
  console.log("running the server ");
});
app.get("/test", (req, res) =>{
    res.send({ status: 200, message: "ok" })
})
app.get('/time',(req,res)=>{
    const currentDate = new Date ();
    res.send({status:200, message:`${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`})
})
app.get('/hello/:id?', (req, res) => {
  const { id } = req.params;
  res.status(200).json({ status: 200, message: `Hello, ${id}` });
});
app.get('/search', (req, res) => {
  const { s } = req.query;
  if (s) {
    res.status(200).json({ status: 200, message: 'ok', data: s });
  } else {
    res.status(500).json({ status: 500, error: true, message: 'You have to provide a search' });
  }
});
app.get('/movies/create', (req, res) => {
  res.status(200).json({ status: 200, message: 'Create a movie' });
});
app.get('/movies/read', (req, res) => {
  res.status(200).json({ status: 200, data: movies });
});
app.get('/movies/update', (req, res) => {
  res.status(200).json({ status: 200, message: 'Update a movie' });
});
app.get('/movies/delete', (req, res) => {
  res.status(200).json({ status: 200, message: 'Delete a movie' });
});

app.get('/movies/read/by-date', (req, res) => {
  const ByDate = movies.sort((a, b) => a.year - b.year);
  res.status(200).json({ status: 200, data: ByDate });
});


app.get('/movies/read/by-rating', (req, res) => {
  const ByRating = movies.sort((a, b) => b.rating - a.rating);
  res.status(200).json({ status: 200, data: ByRating });
});


app.get('/movies/read/by-title', (req, res) => {
  const ByTitle = movies.sort((a, b) => a.title.localeCompare(b.title));
  res.status(200).json({ status: 200, data: ByTitle });
});